import { useEffect, useRef } from 'react';
import { Check, CheckCheck, FileText, Play, Smile } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { currentUser } from '../data/chats';
import type { Message } from '../data/chats';

function formatMessageTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

function MessageBubble({ message, isOwn, showAvatar, avatar }: { message: Message; isOwn: boolean; showAvatar: boolean; avatar: string }) {
  return (
    <div className={`flex gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'} animate-slide-in`}>
      {!isOwn && showAvatar && (
        <img
          src={avatar}
          alt="Avatar"
          className="w-8 h-8 rounded-full object-cover flex-shrink-0 self-end mb-1"
        />
      )}
      {!isOwn && !showAvatar && <div className="w-8 flex-shrink-0" />}
      
      <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`px-4 py-2.5 rounded-2xl ${
            isOwn
              ? 'message-own text-white rounded-br-md'
              : 'message-other text-foreground rounded-bl-md'
          }`}
        >
          {message.isVoice ? (
            <div className="flex items-center gap-3 min-w-[200px]">
              <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all">
                <Play size={14} className="text-white ml-0.5" />
              </button>
              <div className="flex-1 h-8 flex items-center gap-1">
                {[40, 60, 30, 70, 50, 80, 40, 60, 45, 55, 35, 65, 50, 40, 60, 30, 70, 50].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-white/40"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <span className="text-xs text-white/70">{message.voiceDuration}</span>
            </div>
          ) : (
            <p className="text-sm leading-relaxed">{message.text}</p>
          )}
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.attachments.map((att, i) => (
                <div key={i}>
                  {att.type === 'image' && att.url && (
                    <img
                      src={att.url}
                      alt={att.name}
                      className="rounded-xl max-w-full h-auto"
                    />
                  )}
                  {att.type === 'file' && (
                    <div className={`flex items-center gap-2 p-2 rounded-lg ${isOwn ? 'bg-white/10' : 'bg-white/5'}`}>
                      <FileText size={16} className={isOwn ? 'text-white/70' : 'text-muted-foreground'} />
                      <span className="text-xs truncate">{att.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {message.reactions && message.reactions.length > 0 && (
            <div className={`flex gap-1 mt-1.5 ${isOwn ? 'justify-end' : 'justify-start'}`}>
              {message.reactions.map((r, i) => (
                <span key={i} className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                  {r.emoji} {r.count}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? 'flex-row' : 'flex-row-reverse'}`}>
          <span className="text-[10px] text-muted-foreground">{formatMessageTime(message.timestamp)}</span>
          {isOwn && (
            <span className="text-muted-foreground">
              {message.isRead ? (
                <CheckCheck size={12} className="text-primary" />
              ) : (
                <Check size={12} />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function MessageList() {
  const activeChat = useChatStore((state) => state.getActiveChat());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChat?.messages]);

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Smile size={64} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">Добро пожаловать!</p>
          <p className="text-sm mt-1">Выберите чат, чтобы начать общение</p>
        </div>
      </div>
    );
  }

  const avatar = activeChat.type === 'direct' ? activeChat.participants[0].avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(activeChat.name || '')}&background=random`;

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
      <div className="text-center my-4">
        <span className="text-xs text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
          {new Date(activeChat.messages[0]?.timestamp).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>
      
      {activeChat.messages.map((message, index) => {
        const isOwn = message.senderId === currentUser.id;
        const prevMessage = index > 0 ? activeChat.messages[index - 1] : null;
        const showAvatar = !prevMessage || prevMessage.senderId !== message.senderId;

        return (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={isOwn}
            showAvatar={showAvatar}
            avatar={avatar}
          />
        );
      })}
    </div>
  );
}
