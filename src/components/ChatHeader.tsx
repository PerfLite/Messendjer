import { Phone, Video, Info, ArrowLeft } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export function ChatHeader() {
  const activeChat = useChatStore((state) => state.getActiveChat());
  const { setActiveChat } = useChatStore();

  if (!activeChat) {
    return (
      <div className="h-16 glass-light border-b border-white/5 flex items-center px-6">
        <span className="text-muted-foreground text-sm">Выберите чат</span>
      </div>
    );
  }

  const displayName = activeChat.type === 'direct' ? activeChat.participants[0].name : activeChat.name || 'Без названия';
  const displayAvatar = activeChat.type === 'direct' ? activeChat.participants[0].avatar : activeChat.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;
  const participant = activeChat.type === 'direct' ? activeChat.participants[0] : null;

  return (
    <div className="h-16 glass-light border-b border-white/5 flex items-center px-4 justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveChat(null)}
          className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="relative">
          <img
            src={displayAvatar}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover"
          />
          {participant?.status === 'online' && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f172a]" />
          )}
        </div>
        <div>
          <h3 className="font-medium text-sm">{displayName}</h3>
          {participant ? (
            <p className="text-xs text-muted-foreground">
              {participant.status === 'online' ? 'Онлайн' : participant.lastSeen || 'Оффлайн'}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              {activeChat.participants.length + 1} участников
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
          <Phone size={18} />
        </button>
        <button className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
          <Video size={18} />
        </button>
        <button className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
          <Info size={18} />
        </button>
      </div>
    </div>
  );
}
