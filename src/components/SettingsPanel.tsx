import { X, Moon, Bell, Volume2, Shield, Palette, Globe, User } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { currentUser } from '../data/chats';

export function SettingsPanel() {
  const { settingsOpen, toggleSettings } = useChatStore();

  if (!settingsOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md glass rounded-2xl shadow-2xl overflow-hidden m-4">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-bold">Настройки</h2>
          <button
            onClick={toggleSettings}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto scrollbar-thin space-y-6">
          {/* Profile */}
          <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
            <img
              src={currentUser.avatar}
              alt="Profile"
              className="w-14 h-14 rounded-full ring-2 ring-primary/30"
            />
            <div className="flex-1">
              <h3 className="font-medium">{currentUser.name}</h3>
              <p className="text-sm text-muted-foreground">+7 (999) 123-45-67</p>
            </div>
            <button className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
              <User size={18} />
            </button>
          </div>

          {/* Settings sections */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Внешний вид</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Palette size={16} className="text-primary" />
                  </div>
                  <span className="text-sm">Тема</span>
                </div>
                <span className="text-sm text-muted-foreground">Тёмная</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Moon size={16} className="text-primary" />
                  </div>
                  <span className="text-sm">Ночной режим</span>
                </div>
                <div className="w-10 h-5 rounded-full bg-primary relative">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Уведомления</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Bell size={16} className="text-primary" />
                  </div>
                  <span className="text-sm">Push-уведомления</span>
                </div>
                <div className="w-10 h-5 rounded-full bg-primary relative">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Volume2 size={16} className="text-primary" />
                  </div>
                  <span className="text-sm">Звуки</span>
                </div>
                <div className="w-10 h-5 rounded-full bg-primary relative">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Приватность</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Shield size={16} className="text-primary" />
                  </div>
                  <span className="text-sm">Двухфакторная аутентификация</span>
                </div>
                <div className="w-10 h-5 rounded-full bg-muted relative">
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Globe size={16} className="text-primary" />
                  </div>
                  <span className="text-sm">Язык</span>
                </div>
                <span className="text-sm text-muted-foreground">Русский</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/5 text-center">
          <p className="text-xs text-muted-foreground">Messenger v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
