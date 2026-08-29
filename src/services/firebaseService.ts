import { 
  db, 
  auth, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  serverTimestamp 
} from '../lib/firebase';
import { 
  Listing, 
  Conversation, 
  SavedSearchAlert, 
  CommercialBannerAd, 
  HeroSpotlightConfig, 
  PlatformConfig,
  PaymentTransaction 
} from '../types';
import { INITIAL_LISTINGS, COMMERCIAL_BANNER_ADS, INITIAL_HERO_SPOTLIGHT, INITIAL_PLATFORM_CONFIG } from '../data/mockData';

const LISTINGS_COL = 'listings';
const BANNERS_COL = 'commercial_banners';
const SPOTLIGHT_COL = 'hero_spotlight';
const CONFIG_COL = 'platform_config';
const CHATS_COL = 'conversations';
const ALERTS_COL = 'saved_alerts';
const TRANSACTIONS_COL = 'transactions';
const SYSTEM_COL = 'system';

/**
 * Retrieve set of permanently deleted listing IDs from local cache and Firestore
 */
export function getLocalDeletedIds(): Set<string> {
  try {
    const raw = localStorage.getItem('marketpro_deleted_listing_ids');
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return new Set(arr);
    }
  } catch (e) {}
  return new Set();
}

export function recordDeletedIdLocally(id: string): void {
  try {
    const set = getLocalDeletedIds();
    set.add(id);
    localStorage.setItem('marketpro_deleted_listing_ids', JSON.stringify(Array.from(set)));
  } catch (e) {}
}

/**
 * Syncs listings collection in real-time from Firestore.
 * Ensures deleted listings are never resurrected by mock data or empty checks.
 */
export function subscribeToListings(callback: (listings: Listing[]) => void): () => void {
  const q = query(collection(db, LISTINGS_COL));

  const unsubscribe = onSnapshot(q, async (snapshot) => {
    const deletedIds = getLocalDeletedIds();

    if (snapshot.empty) {
      // Check if this is the first time setup, or if user deleted all ads
      try {
        const seedDoc = await getDoc(doc(db, SYSTEM_COL, 'seed_status'));
        if (!seedDoc.exists()) {
          // First time database bootstrap only
          await seedInitialListings();
          const filtered = INITIAL_LISTINGS.filter(l => !deletedIds.has(l.id));
          callback(filtered);
          return;
        } else {
          // User legitimately deleted all listings
          callback([]);
          return;
        }
      } catch {
        const filtered = INITIAL_LISTINGS.filter(l => !deletedIds.has(l.id));
        callback(filtered);
        return;
      }
    }

    const items: Listing[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as Listing;
      const listingId = docSnap.id;
      // Skip if marked deleted
      if (!deletedIds.has(listingId)) {
        items.push({ ...data, id: listingId });
      }
    });
    
    // Sort active / featured first
    items.sort((a, b) => {
      const aVip = a.featuredTier === 'vip_gold';
      const bVip = b.featuredTier === 'vip_gold';
      if (aVip && !bVip) return -1;
      if (!aVip && bVip) return 1;
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });

    callback(items);
  }, (error) => {
    console.warn('Firestore listings subscription fallback to local cache:', error);
    const deletedIds = getLocalDeletedIds();
    try {
      const saved = localStorage.getItem('marketpro_listings_custom');
      if (saved) {
        const parsed: Listing[] = JSON.parse(saved);
        callback(parsed.filter(l => !deletedIds.has(l.id)));
      } else {
        callback(INITIAL_LISTINGS.filter(l => !deletedIds.has(l.id)));
      }
    } catch {
      callback(INITIAL_LISTINGS.filter(l => !deletedIds.has(l.id)));
    }
  });

  return unsubscribe;
}

async function seedInitialListings() {
  try {
    const deletedIds = getLocalDeletedIds();
    // Mark system seed as completed so it never re-seeds over user deletions
    await setDoc(doc(db, SYSTEM_COL, 'seed_status'), {
      seeded: true,
      seededAt: new Date().toISOString()
    });

    for (const listing of INITIAL_LISTINGS) {
      if (!deletedIds.has(listing.id)) {
        await setDoc(doc(db, LISTINGS_COL, listing.id), {
          ...listing,
          syncedAt: new Date().toISOString()
        });
      }
    }
  } catch (err) {
    console.error('Error seeding initial Firestore listings:', err);
  }
}

/**
 * Save / Update a listing in Firestore
 */
export async function saveListingToFirestore(listing: Listing): Promise<void> {
  try {
    const listingRef = doc(db, LISTINGS_COL, listing.id);
    await setDoc(listingRef, {
      ...listing,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error('Error saving listing to Firestore:', err);
    throw err;
  }
}

/**
 * Update Listing status (e.g. active, pending, rejected, sold, deleted)
 */
export async function updateListingStatusInFirestore(listingId: string, status: 'active' | 'pending' | 'rejected' | 'sold'): Promise<void> {
  try {
    const listingRef = doc(db, LISTINGS_COL, listingId);
    await updateDoc(listingRef, {
      status,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error updating listing status in Firestore:', err);
    throw err;
  }
}

/**
 * Delete a listing permanently from Firestore & local persistence blacklist
 */
export async function deleteListingFromFirestore(listingId: string): Promise<void> {
  // 1. Record ID permanently in local deleted blacklist
  recordDeletedIdLocally(listingId);

  // 2. Remove from localStorage cache
  try {
    const raw = localStorage.getItem('marketpro_listings_custom');
    if (raw) {
      const arr: Listing[] = JSON.parse(raw);
      const updated = arr.filter(item => item.id !== listingId);
      localStorage.setItem('marketpro_listings_custom', JSON.stringify(updated));
    }
  } catch (e) {}

  // 3. Delete from Firestore collection & update deleted_listings register in Firestore
  try {
    await deleteDoc(doc(db, LISTINGS_COL, listingId));
    await setDoc(doc(db, SYSTEM_COL, 'deleted_listings'), {
      [listingId]: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore doc delete notification (cached offline):', err);
  }
}

/**
 * Real-time Conversations sync
 */
export function subscribeToConversations(
  userId: string, 
  callback: (conversations: Conversation[]) => void
): () => void {
  const q = query(collection(db, CHATS_COL));

  return onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      callback([]);
      return;
    }
    const convs: Conversation[] = [];
    snapshot.forEach((snap) => {
      const data = snap.data() as Conversation;
      convs.push({ ...data, id: snap.id });
    });
    callback(convs);
  }, (err) => {
    console.warn('Conversations sync error:', err);
  });
}

/**
 * Send / Append message in Firestore conversation
 */
export async function saveConversationToFirestore(conversation: Conversation): Promise<void> {
  try {
    await setDoc(doc(db, CHATS_COL, conversation.id), {
      ...conversation,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error('Error saving conversation to Firestore:', err);
  }
}

/**
 * Record a payment / boost transaction
 */
export async function recordTransactionInFirestore(tx: PaymentTransaction): Promise<void> {
  try {
    await setDoc(doc(db, TRANSACTIONS_COL, tx.id), {
      ...tx,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error recording transaction:', err);
  }
}

/**
 * Save user search alert to Firestore
 */
export async function saveSearchAlertToFirestore(alert: SavedSearchAlert): Promise<void> {
  try {
    await setDoc(doc(db, ALERTS_COL, alert.id), {
      ...alert,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error saving search alert:', err);
  }
}
