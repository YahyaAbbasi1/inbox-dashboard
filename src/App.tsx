import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import ChatList from './components/ChatList/ChatList';
import ChatWindow from './components/ChatWindow/ChatWindow';
import DetailsPanel from './components/DetailsPanel/DetailsPanel';
import HoneycombLoader from './components/Loaders/HoneycombLoader';
import SkeletonLoader from './components/Loaders/SkeletonLoader';
import { useChatList } from './hooks/useChatList';
import { useMessages } from './hooks/useMessages';
import type { LoadingPhase, ChatDetails } from './types';
import './App.css';

function App() {
  const [loadingPhase, setLoadingPhase] = useState<LoadingPhase>('honeycomb');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [activeUser, setActiveUser] = useState('Sarah Williams');

  const { chats, loading: chatsLoading } = useChatList();
  const { messages, conversation, loading: messagesLoading, sendMessage, sending } = useMessages(selectedChatId);

  // Map conversation to ChatDetails format for DetailsPanel
  const chatDetails: ChatDetails | null = conversation ? {
    assignee: conversation.assignee || 'Unassigned',
    team: conversation.team || 'No Team',
    contact: conversation.contact,
    labels: conversation.labels || ['Open'],
    notes: ['Follow up in 2 days', 'Customer interested in premium'],
  } : null;

  // Simulate loading sequence
  useEffect(() => {
    const honeycombTimer = setTimeout(() => {
      setLoadingPhase('skeleton');
    }, 3500);

    const skeletonTimer = setTimeout(() => {
      setLoadingPhase('loaded');
    }, 5000);

    return () => {
      clearTimeout(honeycombTimer);
      clearTimeout(skeletonTimer);
    };
  }, []);

  const handleUserSelect = (name: string) => {
    setActiveUser(name);
  };

  const selectedChat = chats.find(c => c.id === selectedChatId);

  if (loadingPhase === 'honeycomb') {
    return <HoneycombLoader onComplete={() => {}} />;
  }

  if (loadingPhase === 'skeleton') {
    return <SkeletonLoader />;
  }

  return (
    <div className="app">
      <Sidebar activeUser={activeUser} onUserSelect={handleUserSelect} />
      <ChatList
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
        loading={chatsLoading}
      />
      <ChatWindow
        messages={messages}
        contactName={selectedChat?.name || 'Select a conversation'}
        onSendMessage={sendMessage}
        isSending={sending}
        loading={messagesLoading}
      />
      <DetailsPanel details={chatDetails} loading={messagesLoading} />
    </div>
  );
}

export default App;