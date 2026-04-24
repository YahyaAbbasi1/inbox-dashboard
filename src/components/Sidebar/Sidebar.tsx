import React, { useState } from 'react';
import { Inbox, Users, ChevronDown, ChevronRight, User, Circle } from 'lucide-react';
import { SIDEBAR_TEAMS, SIDEBAR_USERS, CHANNELS } from '../../data/mockData';
import './Sidebar.css';

interface SidebarProps {
  activeUser: string;
  onUserSelect: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeUser, onUserSelect }) => {
  const [teamsOpen, setTeamsOpen] = useState(true);
  const [usersOpen, setUsersOpen] = useState(true);
  const [channelsOpen, setChannelsOpen] = useState(true);

  return (
    <aside className="sidebar">
      <div className="sidebar-title">Inbox</div>

      <nav className="sidebar-nav">
        <button className="sidebar-nav-item">
          <Inbox size={15} />
          <span>My Inbox</span>
        </button>
        <button className="sidebar-nav-item">
          <Users size={15} />
          <span>All</span>
          <span className="sidebar-badge">28</span>
        </button>
        <button className="sidebar-nav-item">
          <Circle size={15} />
          <span>Unassigned</span>
          <span className="sidebar-badge">5</span>
        </button>
      </nav>

      <div className="sidebar-section">
        <button className="sidebar-section-header" onClick={() => setTeamsOpen(o => !o)}>
          <span>Teams</span>
          {teamsOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </button>
        {teamsOpen && (
          <div className="sidebar-section-items">
            {SIDEBAR_TEAMS.map(t => (
              <button key={t.name} className={`sidebar-nav-item ${t.active ? 'sidebar-nav-item--active' : ''}`}>
                <span className="sidebar-team-dot" />
                <span>{t.name}</span>
                {t.count > 0 && <span className="sidebar-badge">{t.count}</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="sidebar-section">
        <button className="sidebar-section-header" onClick={() => setUsersOpen(o => !o)}>
          <span>Users</span>
          {usersOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </button>
        {usersOpen && (
          <div className="sidebar-section-items">
            {SIDEBAR_USERS.map(u => (
              <button
                key={u.name}
                className={`sidebar-nav-item ${activeUser === u.name ? 'sidebar-nav-item--selected' : ''}`}
                onClick={() => onUserSelect(u.name)}
              >
                <span className="sidebar-avatar-sm">{u.name.charAt(0)}</span>
                <span className="sidebar-user-name">{u.name}</span>
                {u.count > 0 && <span className="sidebar-badge">{u.count}</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="sidebar-section">
        <button className="sidebar-section-header" onClick={() => setChannelsOpen(o => !o)}>
          <span>Channels</span>
          {channelsOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </button>
        {channelsOpen && (
          <div className="sidebar-section-items">
            {CHANNELS.map((c, i) => (
              <button key={i} className="sidebar-nav-item">
                <span className="sidebar-channel-dot" style={{ background: c.color }} />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <button className="sidebar-nav-item sidebar-footer-item">
          <span className="sidebar-avatar-sm">MJ</span>
          <span>Michael Johnson</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;