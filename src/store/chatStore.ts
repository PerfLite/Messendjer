import { create } from 'zustand';
import { currentUser, chats as initialChats } from '../data/chats';
import type { Chat, Message } from '../data/chats';

interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  searchQuery: string;
  sidebarOpen: boolean;
  settingsOpen: boolean;
  activeCategory: 'all' | 'direct' | 'groups' | 'channels' | 'unread';
  
  setActiveChat: (chatId: string | null) => void;
  setSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
  toggleSettings: () => void;
  setActiveCategory: (category: 'all' | 'direct' | 'groups' | 'channels' | 'unread') => void;
  sendMessage: (chatId: string, text: string) => void;
  markAsRead: (chatId: string) => void;
  togglePin: (chatId: string) => void;
  toggleMute: (chatId: string) => void;
  getFilteredChats: () => Chat[];
  getActiveChat: () => Chat | undefined;
  getUnreadCount: () => number;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: initialChats,
  activeChatId: 'c1',
  searchQuery: '',
  sidebarOpen: true,
  settingsOpen: false,
  activeCategory: 'all',

  setActiveChat: (chatId) => {
    set({ activeChatId: chatId });
    if (chatId) {
      get().markAsRead(chatId);
    }
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  toggleSettings: () => set((state) => ({ settingsOpen: !state.settingsOpen })),
  
  setActiveCategory: (category) => set({ activeCategory: category }),

  sendMessage: (chatId, text) => {
    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toISOString(),
      isRead: true,
    };
    
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      ),
    }));
  },

  markAsRead: (chatId) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      ),
    }));
  },

  togglePin: (chatId) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat
      ),
    }));
  },

  toggleMute: (chatId) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, isMuted: !chat.isMuted } : chat
      ),
    }));
  },

  getFilteredChats: () => {
    const state = get();
    let filtered = state.chats;

    // Filter by category
    switch (state.activeCategory) {
      case 'direct':
        filtered = filtered.filter((c) => c.type === 'direct');
        break;
      case 'groups':
        filtered = filtered.filter((c) => c.type === 'group');
        break;
      case 'channels':
        filtered = filtered.filter((c) => c.type === 'channel');
        break;
      case 'unread':
        filtered = filtered.filter((c) => c.unreadCount > 0);
        break;
    }

    // Filter by search
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      filtered = filtered.filter((chat) => {
        const name = chat.type === 'direct' 
          ? chat.participants[0].name 
          : chat.name || '';
        const lastMessage = chat.messages[chat.messages.length - 1]?.text || '';
        return name.toLowerCase().includes(q) || lastMessage.toLowerCase().includes(q);
      });
    }

    // Sort: pinned first, then by last message time
    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      const aTime = new Date(a.messages[a.messages.length - 1]?.timestamp || 0).getTime();
      const bTime = new Date(b.messages[b.messages.length - 1]?.timestamp || 0).getTime();
      return bTime - aTime;
    });
  },

  getActiveChat: () => {
    const state = get();
    return state.chats.find((c) => c.id === state.activeChatId);
  },

  getUnreadCount: () => {
    return get().chats.reduce((sum, chat) => sum + chat.unreadCount, 0);
  },
}));
