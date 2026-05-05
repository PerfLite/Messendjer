import { Sidebar } from '../components/Sidebar';
import { ChatList } from '../components/ChatList';
import { ChatHeader } from '../components/ChatHeader';
import { MessageList } from '../components/MessageList';
import { MessageInput } from '../components/MessageInput';
import { SettingsPanel } from '../components/SettingsPanel';
import { useChatStore } from '../store/chatStore';

export default function Home() {
  const activeChat = useChatStore((state) => state.getActiveChat());

  return (
    <div className="h-screen w-screen bg-[#0a0e1a] flex overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
      </div>

      <Sidebar />
      <ChatList />
      
      <div className={`flex-1 flex flex-col glass-light ${!activeChat ? 'hidden lg:flex' : 'flex'}`}>
        <ChatHeader />
        <MessageList />
        <MessageInput />
      </div>

      <SettingsPanel />
    </div>
  );
}
