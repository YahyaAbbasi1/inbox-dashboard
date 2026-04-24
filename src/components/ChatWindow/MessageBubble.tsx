import React from 'react';
import type { Message } from '../../types';
import './MessageBubble.css';

interface MessageBubbleProps {
  message: Message;
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isFirstInGroup = true, isLastInGroup = true }) => {
  const getStatusIcon = () => {
    switch (message.status) {
      case 'sent':
        return <span className="msg-status sent">✓</span>;
      case 'delivered':
        return <span className="msg-status delivered">✓✓</span>;
      case 'read':
        return <span className="msg-status read">✓✓</span>;
      default:
        return null;
    }
  };

  return (
    <div className={`msg-wrapper ${message.isAgent ? 'msg-wrapper--agent' : 'msg-wrapper--user'}`}>
      <div className={`msg-bubble ${message.isAgent ? 'msg-bubble--agent' : 'msg-bubble--user'}`}>
        <p className="msg-content">{message.content}</p>
        <div className="msg-meta">
          <span className="msg-time">{message.timestamp}</span>
          {message.isAgent && getStatusIcon()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;