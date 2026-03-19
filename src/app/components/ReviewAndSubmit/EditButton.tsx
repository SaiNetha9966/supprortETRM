import React from 'react';
import styles from './ReviewSubmit.module.css';
import { StepType } from '../Utils/UiUtilis';

interface EditButtonProps {
  handleEditButton: (step: StepType, tittle: string, desc: string) => void;
  ariaLabel?: string;
  step: StepType;
  tittle: string;
  desc: string;
}

const EditButton: React.FC<EditButtonProps> = ({
  handleEditButton,
  ariaLabel = 'Edit',
  step,
  tittle,
  desc,
}) => {
  return (
    <button
      className={styles.editButton}
      aria-label={ariaLabel}
      onClick={() => handleEditButton(step, tittle, desc)}
    >
      <svg
        width="14.98"
        height="14.98"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor" />
        <path
          d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          fill="currentColor"
        />
      </svg>
      <span>{ariaLabel}</span>
    </button>
  );
};

export default EditButton;
