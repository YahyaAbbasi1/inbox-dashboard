import React, { useEffect, useState } from 'react';
import './HoneycombLoader.css';

interface HoneycombLoaderProps {
  onComplete: () => void;
}

const HoneycombLoader: React.FC<HoneycombLoaderProps> = ({ onComplete }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [progress, setProgress] = useState(0);

  // Honeycomb icons based on Figma design
  const honeycombs = [
    { icon: "📧", label: "Inbox" },
    { icon: "👥", label: "Contacts" },
    { icon: "🤖", label: "AI" },
    { icon: "⚡", label: "Workflows" },
    { icon: "📢", label: "Campaigns" },
    { icon: "💬", label: "Chat" },
    { icon: "📊", label: "Analytics" },
  ];

  useEffect(() => {
    // Animate each honeycomb lighting up one by one
    const interval = setInterval(() => {
      setActiveIndex(prev => {
        if (prev >= honeycombs.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 300);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Complete after animation
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete, honeycombs.length]);

  return (
    <div className="honeycomb-loader">
      <div className="honeycomb-container">
        {/* Honeycomb Grid - Row 1 */}
        <div className="honeycomb-row">
          <div className={`honeycomb ${activeIndex >= 0 ? 'active' : ''}`}>
            <div className="honeycomb-icon">{honeycombs[0].icon}</div>
            <span className="honeycomb-label">{honeycombs[0].label}</span>
          </div>
          <div className={`honeycomb ${activeIndex >= 1 ? 'active' : ''}`}>
            <div className="honeycomb-icon">{honeycombs[1].icon}</div>
            <span className="honeycomb-label">{honeycombs[1].label}</span>
          </div>
          <div className={`honeycomb ${activeIndex >= 2 ? 'active' : ''}`}>
            <div className="honeycomb-icon">{honeycombs[2].icon}</div>
            <span className="honeycomb-label">{honeycombs[2].label}</span>
          </div>
        </div>

        {/* Honeycomb Grid - Row 2 (offset) */}
        <div className="honeycomb-row offset">
          <div className={`honeycomb ${activeIndex >= 3 ? 'active' : ''}`}>
            <div className="honeycomb-icon">{honeycombs[3].icon}</div>
            <span className="honeycomb-label">{honeycombs[3].label}</span>
          </div>
          <div className={`honeycomb ${activeIndex >= 4 ? 'active' : ''}`}>
            <div className="honeycomb-icon">{honeycombs[4].icon}</div>
            <span className="honeycomb-label">{honeycombs[4].label}</span>
          </div>
          <div className={`honeycomb ${activeIndex >= 5 ? 'active' : ''}`}>
            <div className="honeycomb-icon">{honeycombs[5].icon}</div>
            <span className="honeycomb-label">{honeycombs[5].label}</span>
          </div>
        </div>

        {/* Honeycomb Grid - Row 3 */}
        <div className="honeycomb-row">
          <div className={`honeycomb ${activeIndex >= 6 ? 'active' : ''}`}>
            <div className="honeycomb-icon">{honeycombs[6].icon}</div>
            <span className="honeycomb-label">{honeycombs[6].label}</span>
          </div>
        </div>
      </div>

      {/* Loading Text & Progress */}
      <div className="loading-content">
        <h2 className="loading-title">Extracting Information...</h2>
        <p className="loading-subtitle">
          We are extracting information from the above honey combs to your system
        </p>
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-percent">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default HoneycombLoader;