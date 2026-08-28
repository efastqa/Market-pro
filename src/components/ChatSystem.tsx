import React, { useState, useEffect, useRef } from 'react';
import { Conversation, Listing, Message } from '../types';
import { 
  X, 
  Send, 
  Phone, 
  DollarSign, 
  Check, 
  CheckCheck, 
  MapPin, 
  Sparkles, 
  Image as ImageIcon, 
  ShieldCheck,
  ArrowLeft,
  Paperclip,
  Smile
} from 'lucide-react';
import { PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';

interface ChatSystemProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeListing?: Listing | null;
  onSendMessage: (conversationId: string, text: string, isOffer?: boolean, offerAmount?: number) => void;
  onAcceptOffer?: (conversationId: string, messageId: string) => void;
}

export const ChatSystem: React.FC<ChatSystemProps> = ({
  isOpen,
  onClose,
  conversations,
  activeListing,
  onSendMessage,
  onAcceptOffer,
}) => {
  const [selectedConvId, setSelectedConvId] = useState<string>(
    conversations[0]?.id || ''
  );
  const [inputText, setInputText] = useState('');
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerInput, setOfferInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // If active listing passed and conversation doesn't exist, select or handle
  useEffect(() => {
    if (activeListing) {
      const match = conversations.find(c => c.listingId === activeListing.id);
      if (match) {
        setSelectedConvId(match.id);
      }
    }
  }, [activeListing, conversations]);

  const activeConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeConv) return;

    onSendMessage(activeConv.id, inputText);
    setInputText('');
  };

  const handleQuickQuestion = (question: string) => {
    if (!activeConv) return;
    onSendMessage(activeConv.id, question);
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(offerInput);
    if (!amount || isNaN(amount) || !activeConv) return;

    onSendMessage(
      activeConv.id,
      `I submitted a formal cash offer of ${amount.toLocaleString()} QAR`,
      true,
      amount
    );
    setShowOfferModal(false);
    setOfferInput('');
  };

  const quickQuestions = [
    'Salam! Is this still available?',
    'What is your lowest price for cash?',
    'Can we meet today at The Pearl?',
    'Does it have official Qatar agency warranty?'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl h-[88vh] max-h-[720px] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Conversations List */}
        <div className={`w-full md:w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50 dark:bg-slate-900/90 ${
          activeConv && 'hidden md:flex'
        }`}>
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">MarketPro Messages</h3>
              <p className="text-[11px] text-slate-500">Live Qatar Buyer-Seller Chat</p>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {conversations.map((conv) => {
              const isSelected = conv.id === selectedConvId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-rose-50 dark:bg-rose-950/30 border-l-4 border-[#8A1538]'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={conv.otherUser.avatar}
                      alt={conv.otherUser.name}
                      className="w-11 h-11 rounded-2xl object-cover"
                    />
                    {conv.otherUser.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {conv.otherUser.name}
                      </h4>
                      <span className="text-[10px] text-slate-400">{conv.lastMessageTime}</span>
                    </div>

                    <p className="text-[11px] font-semibold text-[#8A1538] dark:text-rose-400 truncate">
                      {conv.listingTitle} ({conv.listingPrice.toLocaleString()} QAR)
                    </p>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {conv.lastMessage}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Chat Window */}
        {activeConv ? (
          <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 min-w-0">
            {/* Chat Header with Listing context & Actions */}
            <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <button
                  onClick={() => setSelectedConvId('')}
                  className="md:hidden p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <img
                  src={activeConv.listingImage}
                  alt={activeConv.listingTitle}
                  className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {activeConv.otherUser.name}
                    </h4>
                    {activeConv.otherUser.isVerified && (
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" title="Verified Qatar Seller" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    {activeConv.listingTitle} • <strong className="text-[#8A1538] dark:text-rose-400 font-bold">{activeConv.listingPrice.toLocaleString()} QAR</strong>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setShowOfferModal(true)}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Make Offer</span>
                </button>

                <a
                  href={`https://wa.me/97477315415?text=${encodeURIComponent(`Salam from MarketPro Chat regarding ${activeConv.listingTitle}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                  title="Open WhatsApp (+974 7731 5415)"
                >
                  <Phone className="w-4 h-4" />
                </a>

                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[radial-gradient(#8a153808_1px,transparent_1px)] [background-size:16px_16px]">
              {/* Trust Badge */}
              <div className="text-center my-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  Never transfer money outside MarketPro Escrow or before physical inspection in Qatar.
                </span>
              </div>

              {activeConv.messages.map((msg) => {
                const isMe = msg.senderId === 'current-user';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[82%] sm:max-w-[70%] rounded-2xl p-3 shadow-sm ${
                        isMe
                          ? 'bg-gradient-to-r from-[#8A1538] to-[#a81c47] text-white rounded-tr-none'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none border border-slate-200/60 dark:border-slate-700/60'
                      }`}
                    >
                      {/* Offer Special Card */}
                      {msg.isOffer && (
                        <div className={`mb-2 p-2.5 rounded-xl border ${
                          isMe 
                            ? 'bg-black/20 border-white/20' 
                            : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700'
                        }`}>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider block opacity-80">
                            Cash Offer Proposed
                          </span>
                          <span className="text-base font-black text-amber-300">
                            {msg.offerAmount?.toLocaleString()} QAR
                          </span>

                          {msg.offerStatus === 'accepted' && (
                            <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                              <Check className="w-3.5 h-3.5" /> Offer Accepted!
                            </div>
                          )}
                        </div>
                      )}

                      <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>

                      <div className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
                        isMe ? 'text-rose-200' : 'text-slate-400'
                      }`}>
                        <span>{msg.timestamp}</span>
                        {isMe && <CheckCheck className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick response suggestions */}
            <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuickQuestion(q)}
                  className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-[11px] border border-slate-200 dark:border-slate-700 whitespace-nowrap transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-white dark:bg-slate-900">
              <input
                type="text"
                placeholder="Type your message in Arabic or English..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 text-xs sm:text-sm p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#8A1538]"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-2xl bg-[#8A1538] hover:bg-rose-800 text-white disabled:opacity-40 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
            <Sparkles className="w-12 h-12 text-[#8A1538] mb-2" />
            <h4 className="font-bold text-slate-700 dark:text-slate-300 text-base">Select a conversation</h4>
            <p className="text-xs text-slate-500 mt-1">Start chatting with sellers and buyers in Qatar</p>
          </div>
        )}

        {/* Offer Negotiation Modal */}
        {showOfferModal && activeConv && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-700 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
                <DollarSign className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-black text-slate-900 dark:text-white text-base">Make a Cash Offer</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Original listing price: <strong className="text-[#8A1538] dark:text-rose-400">{activeConv.listingPrice.toLocaleString()} QAR</strong>
                </p>
              </div>

              <form onSubmit={handleSendOffer} className="space-y-3">
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Enter your offer amount in QAR"
                    value={offerInput}
                    onChange={(e) => setOfferInput(e.target.value)}
                    required
                    autoFocus
                    className="w-full text-center text-lg font-bold p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                  <span className="absolute right-3 top-3.5 text-xs font-bold text-slate-400">QAR</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShowOfferModal(false)}
                    className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 rounded-xl bg-[#8A1538] hover:bg-rose-800 text-white text-xs font-bold shadow-md"
                  >
                    Submit Offer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
