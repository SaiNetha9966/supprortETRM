import React from 'react';
import styles from './ActionButtons.module.css';

interface ActionButtonsProps {
  onDiscard?: () => void;
  onContinue?: () => void;
  isBackButtinShoewn?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onDiscard, onContinue, isBackButtinShoewn }) => {
  return (
    <div className={styles.container}>
      <button className={`${styles.button} ${styles.discardButton}`} onClick={onDiscard}>
        Discard
      </button>
      <div style={{ display: 'flex', gap: '12px' }}>
        {
          isBackButtinShoewn && (
            <button className={`${styles.button} ${styles.discardButton}`} onClick={onDiscard}>
              Back
            </button>
          )
        }
        <button className={`${styles.button} ${styles.continueButton}`} onClick={onContinue}>
          Continue
        </button>
      </div>

    </div>
  );
};
