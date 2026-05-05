import { Search, Pin, VolumeX, Volume2, MessageCircle } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import type { Chat } from '../data/chats';

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  if (isToday) {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }
  
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Вчера';
  }
  
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

function ChatItem({ chat }: { chat: Chat }) {
  const { activeChatId, setActiveChat, togglePin, toggleMute } = useChatStore();
  const isActive = chat.id === activeChatId;
  const lastMessage = chat.messages[chat.messages.length - 1];
  const displayName = chat.type === 'direct' ? chat.participants[0].name : chat.name || 'Без названия';
  const displayAvatar = chat.type === 'direct' ? chat.participants[0].avatar : chat.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;

  return (
    <div
      className={`group relative px-3 py-3 mx-2 rounded-xl cursor-pointer transition-all ${
        isActive ? 'chat-active' : 'hover:bg-white/5'
      }`}
      onClick={() => setActiveChat(chat.id)}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <img
            src={displayAvatar}
            alt={displayName}
            className="w-12 h-12 rounded-full object-cover"
          />
          {chat.type === 'direct' && chat.participants[0].status === 'online' && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0f172a]" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className={`font-medium text-sm truncate ${isActive ? 'text-primary' : ''}`}>
              {displayName}
            </h4>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {chat.isPinned && <Pin size={12} className="text-primary" />}
              {chat.isMuted && <VolumeX size={12} className="text-muted-foreground" />}
              {lastMessage && (
                <span className="text-xs text-muted-foreground">{formatTime(lastMessage.timestamp)}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <p className="text-xs text-muted-foreground truncate flex-1">
              {lastMessage?.senderId === 'me' && 'Вы: '}
              {lastMessage?.text || 'Нет сообщений'}
            </p>
            {chat.unreadCount > 0 && !chat.isMuted && (
              <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {chat.unreadCount}
              </span>
            )}
            {chat.unreadCount > 0 && chat.isMuted && (
              <span className="bg-muted-foreground/30 text-muted-foreground text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {chat.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hover actions */}
      <div className="absolute top-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <button
          onClick={(e) => { e.stopPropagation(); togglePin(chat.id); }}
          className="p-1.5 rounded-lg bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
        >
          <Pin size={14} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); toggleMute(chat.id); }}
          className="p-1.5 rounded-lg bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
        >
          {chat.isMuted ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </button>
      </div>
    </div>
  );
}

export function ChatList() {
  const { searchQuery, setSearchQuery, getFilteredChats, getUnreadCount } = useChatStore();
  const filteredChats = getFilteredChats();
  const unreadCount = getUnreadCount();

  return (
    <div className="w-80 h-screen glass-light flex flex-col border-r border-white/5">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Сообщения</h2>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск чатов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary/50 border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {filteredChats.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
          <MessageCircle size={48} className="mb-4 opacity-30" />
          <p className="text-sm">Нет чатов</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar-thin space-y-1 pb-4">
          {unreadCount > 0 && (
            <div className="px-4 py-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Непрочитанные
              </span>
            </div>
          )}
          {filteredChats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </div>
      )}
    </div>
  );
}
