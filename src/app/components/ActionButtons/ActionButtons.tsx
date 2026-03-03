import React from 'react';
import styles from './ActionButtons.module.css';

interface ActionButtonsProps {
  onDiscard?: () => void;
  onContinue?: () => void;
  onBackButton?: () => void;
  handleOffBoardingFormSubmit?:() => void;
  purpose?: string;
  isBackButtinShoewn?: boolean;
  isContinueDisabled?: boolean;
  disableContinue?: boolean;
  isSubmitDisabled?: boolean;
  isNewClientPage?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onDiscard,
  onContinue,
  onBackButton,
  handleOffBoardingFormSubmit,
  isBackButtinShoewn,
  isContinueDisabled,
  disableContinue,
  isSubmitDisabled,
  isNewClientPage,
  purpose
}) => {
  return (
    <div className={styles.container}>
      {!isNewClientPage && (
        <button className={`${styles.button} ${styles.discardButton}`} onClick={onDiscard}>
          Discard
        </button>
      )}

      <div style={{ display: 'flex', gap: '12px' }}>
        {isBackButtinShoewn && (
          <button className={`${styles.button} ${styles.discardButton}`} onClick={onBackButton}>
            Back
          </button>
        )}
        {isContinueDisabled && (
          <button
            className={`${styles.button} ${styles.continueButton} ${disableContinue ? styles.disabledButton : ''}`}
            onClick={onContinue}
            disabled={disableContinue}
          >
            Continue
          </button>
        )}
        {isSubmitDisabled && (
          <button
            className={`${styles.button} ${styles.continueButton} ${disableContinue ? styles.disabledButton : ''}`}
            onClick={purpose ==="offboarding" ?  handleOffBoardingFormSubmit  :  onContinue}
            disabled={disableContinue}
          >
            Submit
          </button>
        )}
        {isNewClientPage && (
          <>
            <button className={`${styles.button} ${styles.discardButton}`}>
              Back to Dashboard
            </button>
          </>
        )}
        {isNewClientPage && (
          <button className={`${styles.button} ${styles.continueButton}`} onClick={onContinue}>
            Continue to Form
          </button>
        )}
      </div>
    </div>
  );
};
