import React from 'react';
import styles from './ProjectSetup.module.css';
import { OffBoardFormData } from '../Utils/UiUtilis';

interface ProjectSetupProps {
  pageTittle: string;
  pageDesc: string;
  formData: any;
  currentStep: string;
  existingProject?: string;
  existingProjectMetadata?: any;
  existingToolFormData?: any;
  purpose: string;
  offBoardFormData?: OffBoardFormData;
}

export const ProjectSetup: React.FC<ProjectSetupProps> = ({
  formData,
  pageTittle,
  pageDesc,
  currentStep,
  existingProject,
  existingProjectMetadata,
  existingToolFormData,
  purpose,
  offBoardFormData
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
    
  const offBoardProgressBarData = {
      ...offBoardFormData,
      sapProjectId:existingRecord?.sap_project_id ?? offBoardFormData?.sapProjectId,
      selectOffboadingScope:offBoardFormData?.selectOffboadingScope,
      selectedOption: offBoardFormData?.selectedOption,
      selectedOffBoardngImpactTools : offBoardFormData?.selectedOffBoardngImpactTools,
      toolsName: offBoardFormData?.toolsNameChecked,
      dataHandlingtools:offBoardFormData?.dataHandlingtools,
      offBoardconfirmation: offBoardFormData?.offBoardconfirmation
     }
  const progressPercent = calculateProgress(
    purpose === "offboarding" ? offBoardProgressBarData : progressFormData,
    purpose
  );
  const stepTextMap: Record<string, string> = {
    'Tool Configuration': 'Step 2 of 4',
    'Access & Approval': 'Step 3 of 4',
    'Review & Submit': 'Step 4 of 4',
  };
  const stepText = stepTextMap[pageTittle];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{pageTittle}</h2>
      <p className={styles.subtitle}>{pageDesc}</p>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
      </div>
      <p className={styles.progressText}>{progressPercent}% completed</p>
      {stepText && <p className={styles.stepText}>{stepText}</p>}
    </div>
  );
};

export const calculateProgress = (formData: any, purpose: string): number => {
  if (!formData) return 0;

  const onboardingFields: string[] = [
    'sapProjectId',
    'projectCodeName',
    'projectType',
    'estimatedStartDate',
    'estimatedEndDate',
    'description',
    'selectedTools',
    'customToolRequest',
    'primaryPmdPartner',
    'secondoryPmdPartner',
    'informationOwner',
    'delegateIformationOwner',
    'projectManaeger',
    'approvers',
    'confirmation',
  ];

  const offboardingFields: string[] = [
    'sapProjectId',
    'selectOffboadingScope',
    'selectedOption',
    'selectedOffBoardngImpactTools',
    'toolsNameChecked',
    'dataHandlingtools',
    'offBoardconfirmation'
  ];

  const allFields = purpose === "offboarding" ? offboardingFields : onboardingFields;

  const filledFields = allFields.filter((field) => {
    const value = formData[field];
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== null && value !== '';
  });

  return Math.round((filledFields.length / allFields.length) * 100);
};