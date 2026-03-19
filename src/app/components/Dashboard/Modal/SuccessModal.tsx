import React from 'react';
import './SuccessModal.css';

interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  icon?: React.ReactNode; // SVG icon passed dynamically
  showClose?: boolean;
  onClose?: () => void;
  noteLabel?: string;
  notePlaceholder?: string;
  noteRequired?: boolean;
  noteValue?: string;
  onNoteChange?: (value: string) => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  confirmColor?: 'green' | 'red' | 'blue';
  backgroundColor: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  title,
  description,
  icon,
  showClose = true,
  onClose,
  noteLabel,
  notePlaceholder,
  noteRequired = false,
  noteValue = '',
  onNoteChange,
  onCancel,
  onConfirm,
  confirmText,
  confirmColor = 'green',
  backgroundColor,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {showClose && (
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        )}

        {icon && (
          <div className="modal-icon" style={{ backgroundColor: backgroundColor }}>
            {icon}
          </div>
        )}

        <h2 className="modal-title">{title}</h2>
        <p className="modal-description">{description}</p>

        {noteLabel && (
          <div className="modal-note">
            <label>
              {noteLabel} {noteRequired && <span className="required">*</span>}
            </label>
            <textarea
              value={noteValue}
              onChange={(e) => onNoteChange?.(e.target.value)}
              placeholder={notePlaceholder}
              maxLength={80}
            />
            <small>{noteValue.length}/80</small>
          </div>
        )}

        {(onCancel || onConfirm) && (
          <div className="modal-actions">
            {onCancel && (
              <button className="btn cancel" onClick={onCancel}>
                Cancel
              </button>
            )}
            {onConfirm && confirmText && (
              <button className={`btn confirm ${confirmColor}`} onClick={onConfirm}>
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessModal;
