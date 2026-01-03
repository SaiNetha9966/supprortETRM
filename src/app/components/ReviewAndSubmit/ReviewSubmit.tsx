import React, { useState } from 'react';
import styles from './ReviewSubmit.module.css';

interface ReviewSubmitProps {
  onSubmit?: () => void;
  onDiscard?: () => void;
  onBack?: () => void;
}

export const ReviewSubmit: React.FC<ReviewSubmitProps> = ({ onSubmit, onDiscard, onBack }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.reviewSection}>
          <h3 className={styles.sectionTitle}>Project Summary</h3>
          <div className={styles.summaryCard}>
            <div className={styles.summaryItem}>
              <span className={styles.label}>ERTM Project ID:</span>
              <span className={styles.value}>PRJ-8YV03FK</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.label}>Project Status:</span>
              <span className={styles.value}>Ready for Submission</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.label}>Tools Configured:</span>
              <span className={styles.value}>4 Tools Selected</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.label}>Approvers Assigned:</span>
              <span className={styles.value}>3 Users</span>
            </div>
          </div>
        </div>

        <div className={styles.reviewSection}>
          <h3 className={styles.sectionTitle}>Terms & Conditions</h3>
          <div className={styles.termsBox}>
            <p className={styles.termsText}>
              By submitting this project configuration, you confirm that:
            </p>
            <ul className={styles.termsList}>
              <li>All project details are accurate and complete</li>
              <li>Selected tools are appropriate for the project scope</li>
              <li>All required approvers have been notified</li>
              <li>You have authorization to create this project</li>
            </ul>
          </div>
        </div>

        <div className={styles.agreementSection}>
          <label className={styles.agreementLabel}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className={styles.agreementCheckbox}
            />
            <span className={styles.agreementText}>
              I agree to the above terms and conditions
            </span>
          </label>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.discardButton} onClick={onDiscard}>
          Discard
        </button>
        <button className={styles.backButton} onClick={onBack}>
          Back
        </button>
        <button
          className={`${styles.submitButton} ${!agreed ? styles.submitButtonDisabled : ''}`}
          onClick={onSubmit}
          disabled={!agreed}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
