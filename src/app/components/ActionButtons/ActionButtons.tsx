import React from 'react';
import styles from './ActionButtons.module.css';

interface ActionButtonsProps {
  onDiscard?: () => void;
  onContinue?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onDiscard, onContinue }) => {
  return (
    <div className={styles.container}>
      <button className={`${styles.button} ${styles.discardButton}`} onClick={onDiscard}>
        Discard
      </button>
      <button className={`${styles.button} ${styles.continueButton}`} onClick={onContinue}>
        Continue
      </button>
    </div>
  );
};
