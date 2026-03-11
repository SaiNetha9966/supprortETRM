import React from 'react';
import styles from './ActionButtons.module.css';

interface ActionButtonsProps {
  onDiscard?: () => void;
  onContinue?: () => void;
  onBackButton?: () => void;
  onSaveDraft?: () => void;
  saveDraftLoading?: boolean;
  disableSaveDraft?: boolean;
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
  onSaveDraft,
  saveDraftLoading,
  disableSaveDraft,
  handleOffBoardingFormSubmit,
  isBackButtinShoewn,
  isContinueDisabled,
  disableContinue,
  isSubmitDisabled,
  isNewClientPage,
  purpose
}) => {
  const isSaveDraftDisabled = saveDraftLoading || disableSaveDraft;

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', gap: '12px' }}>
        {
          !isNewClientPage && (
            <button className={`${styles.button} ${styles.discardButton}`} onClick={onDiscard}>
              Discard
            </button>
          )
        }
        {
          onSaveDraft && (
            <button 
              className={`${styles.button} ${styles.discardButton} ${isSaveDraftDisabled ? styles.disabledButton : ''}`} 
              onClick={onSaveDraft}
              disabled={isSaveDraftDisabled}
            >
              Save Draft
            </button>
          )
        }
      </div>

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
