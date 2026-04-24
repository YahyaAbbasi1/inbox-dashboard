import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { Chat } from '../../types';
import './ChatList.css';

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
  loading?: boolean;
}

const ChatList: React.FC<ChatListProps> = ({ chats, selectedChatId, onSelectChat, loading = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === 'unread') {
      return matchesSearch && (chat.unread && chat.unread > 0);
    }
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Search Chat</h2>
        </div>
        <div className="chat-list-loading">Loading conversations...</div>
      </div>
    );
  }

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Search Chat</h2>
      </div>

      <div className="chat-search">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Search messages or users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="chat-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'filter-btn--active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'unread' ? 'filter-btn--active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread
        </button>
      </div>

      <div className="chat-items">
        {filteredChats.length === 0 ? (
          <div className="chat-items-empty">No conversations found</div>
        ) : (
          filteredChats.map(chat => (
            <button
              key={chat.id}
              className={`chat-item ${selectedChatId === chat.id ? 'chat-item--selected' : ''}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div
                className="chat-avatar"
                style={{ backgroundColor: chat.avatarColor || '#e0e4f0' }}
              >
                {chat.avatar}
              </div>
              <div className="chat-info">
                <div className="chat-name-row">
                  <span className="chat-name">{chat.name}</span>
                  <span className="chat-time">{chat.time}</span>
                </div>
                <div className="chat-message-preview">
                  <span className="chat-last-message">{chat.lastMessage}</span>
                  {chat.unread && chat.unread > 0 && (
                    <span className="chat-unread-badge">{chat.unread}</span>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;