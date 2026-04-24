import React, { useState } from 'react';
import { User, Mail, Phone, Tag, FileText, ChevronDown, ChevronRight, Edit2, MoreHorizontal } from 'lucide-react';
import type { ChatDetails } from '../../types';
import './DetailsPanel.css';

interface DetailsPanelProps {
  details: ChatDetails | null;
  loading?: boolean;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ details, loading = false }) => {
  const [notesOpen, setNotesOpen] = useState(true);
  const [labelsOpen, setLabelsOpen] = useState(true);
  const [contactOpen, setContactOpen] = useState(true);

  if (loading) {
    return (
      <aside className="details-panel">
        <div className="details-loading">Loading details...</div>
      </aside>
    );
  }

  if (!details) {
    return (
      <aside className="details-panel">
        <div className="details-empty">Select a conversation to view details</div>
      </aside>
    );
  }

  return (
    <aside className="details-panel">
      <div className="details-header">
        <h4>Details</h4>
        <button className="details-more-btn">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="details-content">
        {/* Contact Section */}
        <div className="details-section">
          <button className="details-section-header" onClick={() => setContactOpen(o => !o)}>
            <span>Contact</span>
            {contactOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          {contactOpen && (
            <div className="details-section-content">
              <div className="detail-row">
                <User size={14} className="detail-icon" />
                <span className="detail-label">Name:</span>
                <span className="detail-value">{`${details.contact.firstName} ${details.contact.lastName}`}</span>
              </div>
              <div className="detail-row">
                <Mail size={14} className="detail-icon" />
                <span className="detail-label">Email:</span>
                <span className="detail-value">{details.contact.email}</span>
              </div>
              <div className="detail-row">
                <Phone size={14} className="detail-icon" />
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{details.contact.phone}</span>
              </div>
            </div>
          )}
        </div>

        {/* Assignment Section */}
        <div className="details-section">
          <h5 className="details-subtitle">Assignment</h5>
          <div className="detail-row">
            <span className="detail-label">Assignee:</span>
            <span className="detail-value">{details.assignee}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Team:</span>
            <span className="detail-value">{details.team}</span>
          </div>
        </div>

        {/* Labels Section */}
        <div className="details-section">
          <button className="details-section-header" onClick={() => setLabelsOpen(o => !o)}>
            <span>Labels</span>
            {labelsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          {labelsOpen && (
            <div className="details-section-content">
              <div className="labels-container">
                {details.labels.map(label => (
                  <span key={label} className="label-badge">{label}</span>
                ))}
                <button className="add-label-btn">
                  <Edit2 size={12} />
                  <span>Add label</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div className="details-section">
          <button className="details-section-header" onClick={() => setNotesOpen(o => !o)}>
            <span>Notes</span>
            {notesOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          {notesOpen && (
            <div className="details-section-content">
              {details.notes.map((note, idx) => (
                <div key={idx} className="note-item">
                  <FileText size={14} className="note-icon" />
                  <span>{note}</span>
                </div>
              ))}
              <button className="add-note-btn">+ Add private note</button>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="details-section">
          <h5 className="details-subtitle">See all</h5>
          <div className="detail-row see-all-row">
            <span>View full conversation history</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DetailsPanel;