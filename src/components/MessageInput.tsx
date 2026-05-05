import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Mic, Image } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export function MessageInput() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const activeChat = useChatStore((state) => state.getActiveChat());
  const { sendMessage } = useChatStore();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  }, [text]);

  const handleSend = () => {
    if (!text.trim() || !activeChat) return;
    sendMessage(activeChat.id, text.trim());
    setText('');
    setIsTyping(false);
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!activeChat) return null;

  return (
    <div className="p-3 glass-light border-t border-white/5">
      {isTyping && (
        <div className="flex items-center gap-2 mb-2 px-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
            <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
            <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
          </div>
          <span className="text-xs text-muted-foreground">печатает...</span>
        </div>
      )}
      
      <div className="flex items-end gap-2">
        <button className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all flex-shrink-0">
          <Paperclip size={20} />
        </button>
        <button className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all flex-shrink-0">
          <Image size={20} />
        </button>
        
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setIsTyping(e.target.value.length > 0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Напишите сообщение..."
            rows={1}
            className="w-full bg-secondary/50 border border-white/5 rounded-2xl px-4 py-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none min-h-[44px] max-h-[120px] scrollbar-thin"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all">
            <Smile size={18} />
          </button>
        </div>
        
        {text.trim() ? (
          <button
            onClick={handleSend}
            className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all flex-shrink-0"
          >
            <Send size={20} />
          </button>
        ) : (
          <button className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all flex-shrink-0">
            <Mic size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
