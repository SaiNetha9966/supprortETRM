import React from 'react';
import styles from './ProjectSetup.module.css';
import { calculateProgress } from '../Utils/UiUtilis';

interface ProjectSetupProps {
  pageTittle: string;
  pageDesc: string;
  formData: any;
  currentStep: string;
  existingProject?: string;
  existingProjectMetadata?: any;
  existingToolFormData?: any;
}

export const ProjectSetup: React.FC<ProjectSetupProps> = ({
  formData,
  pageTittle,
  pageDesc,
  currentStep,
  existingProject,
  existingProjectMetadata,
  existingToolFormData,
}) => {
  const isExistingProject = existingProject === 'yes';
  const existingRecord = existingProjectMetadata?.result?.existing_record_id ?? null;
  const existingTools = existingProjectMetadata?.result?.existingtools ?? [];
  const selectedTools = isExistingProject
    ? [...existingTools, ...(existingToolFormData?.selectedTools ?? [])]
    : formData.selectedTools;

  const progressFormData = isExistingProject
    ? {
        ...formData,
        sapProjectId: existingRecord?.sap_project_id ?? formData.sapProjectId,
        projectCodeName: existingRecord?.project_code_name ?? formData.projectCodeName,
        projectType: existingRecord?.project_type ?? formData.projectType,
        estimatedStartDate: existingRecord?.estimated_start_date ?? formData.estimatedStartDate,
        estimatedEndDate: existingRecord?.estimated_end_date ?? formData.estimatedEndDate,
        description: existingRecord?.please_describe ?? formData.description,
        selectedTools,
        customToolRequest: existingToolFormData?.customToolRequest ?? formData.customToolRequest,
      }
    : formData;

  const progressPercent = calculateProgress(progressFormData);

  const stepTextMap: Record<string, string> = {
    'Tool Configuration': 'Step 2 of 4',
    'Access & Approval': 'Step 3 of 4',
    'Review & Submit': 'Step 4 of 4',
  };
  const stepText = stepTextMap[pageTittle];

  return (
    // <div className={styles.container}>
    //   <h2 className={styles.title}>{pageTittle}</h2>
    //   <p className={styles.subtitle}>{pageDesc}</p>
    //   <div className={styles.progressBar}>
    //     <div className={styles.progressFill} />
    //   </div>
    //   <p className={styles.progressText}>{progressPercent} % completed</p>
    // </div>

    <div className={styles.container}>
      <h2 className={styles.title}>{pageTittle}</h2>
      <p className={styles.subtitle}>{pageDesc}</p>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
      </div>

      <p className={styles.progressText}>{progressPercent}% completed</p>
    </div>
  );
};
