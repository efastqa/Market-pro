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

/**
 * Syncs listings collection in real-time from Firestore.
 * Automatically seeds initial curated listings if Firestore is empty.
 */
export function subscribeToListings(callback: (listings: Listing[]) => void): () => void {
  const q = query(collection(db, LISTINGS_COL));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      // Seed Firestore with initial rich Qatar listings
      seedInitialListings();
      callback(INITIAL_LISTINGS);
      return;
    }

    const items: Listing[] = [];
    snapshot.forEach((docSnap) => {
      items.push({ ...(docSnap.data() as Listing), id: docSnap.id });
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
    // Fallback to local
    try {
      const saved = localStorage.getItem('marketpro_listings_custom');
      if (saved) callback(JSON.parse(saved));
      else callback(INITIAL_LISTINGS);
    } catch {
      callback(INITIAL_LISTINGS);
    }
  });

  return unsubscribe;
}

async function seedInitialListings() {
  try {
    for (const listing of INITIAL_LISTINGS.slice(0, 15)) {
      await setDoc(doc(db, LISTINGS_COL, listing.id), {
        ...listing,
        syncedAt: new Date().toISOString()
      });
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
 * Update Listing status (e.g. active, pending, rejected, sold)
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
 * Delete a listing in Firestore
 */
export async function deleteListingFromFirestore(listingId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, LISTINGS_COL, listingId));
  } catch (err) {
    console.error('Error deleting listing from Firestore:', err);
    throw err;
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
