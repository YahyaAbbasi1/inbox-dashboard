import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="sk-container">
      {/* Sidebar Skeleton */}
      <aside className="sk-sidebar">
        <div className="sk-sidebar-header">
          <div className="sk-title"></div>
        </div>
        
        <div className="sk-nav">
          <div className="sk-nav-item"></div>
          <div className="sk-nav-item"></div>
          <div className="sk-nav-item"></div>
        </div>

        <div className="sk-section">
          <div className="sk-section-header"></div>
          <div className="sk-section-item"></div>
          <div className="sk-section-item"></div>
        </div>

        <div className="sk-section">
          <div className="sk-section-header"></div>
          <div className="sk-user-item">
            <div className="sk-avatar-sm"></div>
            <div className="sk-text"></div>
          </div>
          <div className="sk-user-item">
            <div className="sk-avatar-sm"></div>
            <div className="sk-text"></div>
          </div>
          <div className="sk-user-item">
            <div className="sk-avatar-sm"></div>
            <div className="sk-text"></div>
          </div>
        </div>
      </aside>

      {/* Chat List Skeleton */}
      <div className="sk-chatlist">
        <div className="sk-chatlist-header">
          <div className="sk-heading"></div>
        </div>
        <div className="sk-search"></div>
        <div className="sk-filters">
          <div className="sk-filter"></div>
          <div className="sk-filter"></div>
        </div>
        
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="sk-chat-item">
            <div className="sk-avatar"></div>
            <div className="sk-chat-content">
              <div className="sk-chat-row">
                <div className="sk-name"></div>
                <div className="sk-time"></div>
              </div>
              <div className="sk-message"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window Skeleton */}
      <div className="sk-chatwindow">
        <div className="sk-chat-header">
          <div className="sk-contact-name"></div>
        </div>
        <div className="sk-messages-area">
          <div className="sk-message-bubble sk-message-left"></div>
          <div className="sk-message-bubble sk-message-right"></div>
          <div className="sk-message-bubble sk-message-left"></div>
          <div className="sk-message-bubble sk-message-right"></div>
          <div className="sk-message-bubble sk-message-left"></div>
        </div>
        <div className="sk-input-area">
          <div className="sk-input"></div>
        </div>
      </div>

      {/* Details Panel Skeleton */}
      <aside className="sk-details">
        <div className="sk-details-header">
          <div className="sk-details-title"></div>
        </div>
        <div className="sk-details-section">
          <div className="sk-details-label"></div>
          <div className="sk-detail-row">
            <div className="sk-detail-icon"></div>
            <div className="sk-detail-text"></div>
          </div>
          <div className="sk-detail-row">
            <div className="sk-detail-icon"></div>
            <div className="sk-detail-text"></div>
          </div>
        </div>
        <div className="sk-details-section">
          <div className="sk-details-label"></div>
          <div className="sk-detail-row">
            <div className="sk-detail-text"></div>
          </div>
        </div>
        <div className="sk-details-section">
          <div className="sk-details-label"></div>
          <div className="sk-badge"></div>
          <div className="sk-badge"></div>
        </div>
      </aside>
    </div>
  );
};

export default SkeletonLoader;