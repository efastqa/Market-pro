import React from 'react';
import { 
  Home, 
  MapPin, 
  PlusCircle, 
  MessageSquare, 
  User, 
  LayoutDashboard
} from 'lucide-react';
import { UserAccount } from '../types';

interface MobileBottomNavProps {
  currentView: 'home' | 'map' | 'saved' | 'admin' | 'contact';
  onNavigate: (view: 'home' | 'map' | 'saved' | 'admin' | 'contact') => void;
  onOpenPostAd: () => void;
  onOpenChat: () => void;
  unreadCount: number;
  savedCount: number;
  currentUser?: UserAccount | null;
  onOpenProfile?: () => void;
  onOpenAuth?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate,
  onOpenPostAd,
  onOpenChat,
  unreadCount,
  savedCount,
  currentUser,
  onOpenProfile,
  onOpenAuth,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-colors ${
            currentView === 'home'
              ? 'text-[#8A1538] dark:text-rose-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        {/* Map Explorer */}
        <button
          onClick={() => onNavigate('map')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-colors ${
            currentView === 'map'
              ? 'text-[#8A1538] dark:text-rose-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px]">Qatar Map</span>
        </button>

        {/* Floating Post Ad Center Action */}
        <button
          onClick={onOpenPostAd}
          className="flex flex-col items-center -mt-5"
          title="Post Ad"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8A1538] via-rose-700 to-amber-500 text-white shadow-xl shadow-rose-950/40 flex items-center justify-center border-2 border-white dark:border-slate-900 transform active:scale-95 transition-transform">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-[#8A1538] dark:text-rose-400 mt-0.5">Sell (+)</span>
        </button>

        {/* Messages */}
        <button
          onClick={onOpenChat}
          className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-slate-500 dark:text-slate-400 relative"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-emerald-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Chat</span>
        </button>

        {/* User Account / Sign In */}
        {currentUser ? (
          <button
            onClick={onOpenProfile}
            className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-[#8A1538] dark:text-rose-400 font-bold relative"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-5 h-5 rounded-full object-cover border border-amber-400"
            />
            <span className="text-[10px] truncate max-w-[48px]">Account</span>
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-slate-500 dark:text-slate-400"
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">Sign In</span>
          </button>
        )}
      </div>
    </nav>
  );
};
