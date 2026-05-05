import { MessageSquare, Users, Radio, Bell, Settings, Menu } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { currentUser } from '../data/chats';

export function Sidebar() {
  const { activeCategory, setActiveCategory, toggleSettings, sidebarOpen, toggleSidebar } = useChatStore();
  const unreadCount = useChatStore((state) => state.getUnreadCount());

  const categories = [
    { id: 'all' as const, icon: MessageSquare, label: 'Все чаты' },
    { id: 'direct' as const, icon: Users, label: 'Личные' },
    { id: 'groups' as const, icon: Users, label: 'Группы' },
    { id: 'channels' as const, icon: Radio, label: 'Каналы' },
    { id: 'unread' as const, icon: Bell, label: 'Непрочитанные' },
  ];

  if (!sidebarOpen) {
    return (
      <div className="w-16 h-screen glass flex flex-col items-center py-4 gap-2 z-20">
        <button
          onClick={toggleSidebar}
          className="p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
        >
          <Menu size={22} />
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`relative p-3 rounded-xl transition-all ${
              activeCategory === cat.id
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            <cat.icon size={22} />
            {cat.id === 'unread' && unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={toggleSettings}
          className="p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
        >
          <Settings size={22} />
        </button>
        <img
          src={currentUser.avatar}
          alt="Profile"
          className="w-10 h-10 rounded-full ring-2 ring-primary/30"
        />
      </div>
    );
  }

  return (
    <div className="w-64 h-screen glass flex flex-col z-20">
      <div className="p-4 flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
        >
          <Menu size={20} />
        </button>
        <span className="font-bold text-lg bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          Messenger
        </span>
      </div>

      <div className="px-3 py-2 space-y-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
              activeCategory === cat.id
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            <cat.icon size={18} />
            <span className="flex-1 text-left">{cat.label}</span>
            {cat.id === 'unread' && unreadCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1" />

      <div className="p-4 border-t border-white/5">
        <button
          onClick={toggleSettings}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all text-sm font-medium"
        >
          <Settings size={18} />
          <span>Настройки</span>
        </button>
        <div className="mt-3 flex items-center gap-3 px-3">
          <img
            src={currentUser.avatar}
            alt="Profile"
            className="w-9 h-9 rounded-full ring-2 ring-primary/30"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground">Онлайн</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
      </div>
    </div>
  );
}
