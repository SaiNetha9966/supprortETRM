import React from 'react';
import styles from './ProjectSetup.module.css';

interface ProjectSetupProps {
  pageTittle: string;
}

export const ProjectSetup: React.FC<ProjectSetupProps> = ({ pageTittle }) => {
  const stepTextMap: Record<string, string> = {
    'Tool Configuration': 'Step 2 of 4',
    'Access & Approval': 'Step 3 of 4',
    'Review & Submit': 'Step 4 of 4',
  };
  const stepText = stepTextMap[pageTittle];

  return (
    <div className={styles.container}>
      {pageTittle !== 'Project Details' && stepText && (
        <div className="mb-3">
          <div className="inline-flex items-center bg-[#e0eaff] rounded-full border border-[#9bb5fd] px-[9px] py-[6px]">
            <p className="text-[11px] sm:text-[13px] text-[#024870]">{stepText}</p>
          </div>
        </div>
      )}
      <h2 className={styles.title}>{pageTittle}</h2>
      <p className={styles.subtitle}>This process could take a few minutes</p>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} />
      </div>
      <p className={styles.progressText}>20% completed</p>
    </div>
  );
};
