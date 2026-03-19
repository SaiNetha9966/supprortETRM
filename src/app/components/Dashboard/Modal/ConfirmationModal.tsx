import React from 'react';
import './ConfirmationModal.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  title2: string;
  description: string;
  noteLabel?: string;
  notePlaceholder?: string;
  noteRequired?: boolean;
  noteValue: string;
  onNoteChange: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText: string;
  confirmColor?: 'green' | 'red' | 'blue';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  title2,
  description,
  noteLabel,
  notePlaceholder,
  noteRequired = false,
  noteValue,
  onNoteChange,
  onCancel,
  onConfirm,
  confirmText,
  confirmColor = 'green',
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">{title}</h2>
        <h2 className="modal-title2">{title2}</h2>
        <p className="modal-description">{description}</p>

        {noteLabel && (
          <div className="modal-note">
            <label>
              {noteLabel} {noteRequired && <span className="required">*</span>}
            </label>
            <textarea
              value={noteValue}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder={notePlaceholder}
              maxLength={80}
            />
            <small>{noteValue.length}/80</small>
          </div>
        )}

        <div className="modal-actions">
          <button className="btn cancel" onClick={onCancel}>
            Cancel
          </button>
          <button
            className={`btn confirm`}
            style={{
              backgroundColor: confirmColor === 'green' ? '#498E2B' : '#CB282E',
              color: '#FFFFFF',
            }}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
