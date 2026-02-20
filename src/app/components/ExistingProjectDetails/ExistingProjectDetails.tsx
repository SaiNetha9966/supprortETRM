import React, { useEffect } from 'react';
import { Search } from 'lucide-react';
import styles from './ExistingProjectDetails.module.css';
import svgPaths from '../../../imports/svg-m590sprq1z';
import { fetchExistingProjectMetadata } from '../../service/api';
import { formatDate } from '../Utils/UiUtilis';
import OffboardingScope from './OffboardingScope';

const AlertIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d={svgPaths.p341e8200} fill="#006176" />
  </svg>
);

export const ExistingProjectDetails: React.FC<{
  data?: any;
  onMetadataLoaded?: (metadata: any | null) => void;
  existingProjectDetailsFormData: any;
  setExistingProjectDetailsFormData: React.Dispatch<React.SetStateAction<any>>;
  setIsOffBoardSideBar: React.Dispatch<React.SetStateAction<any>>;
  purpose: string;
  onSelectOffBoardingScope: (value: string) => void;
  selectOffboadingScope: string;
}> = ({
  data,
  onMetadataLoaded,
  existingProjectDetailsFormData,
  setExistingProjectDetailsFormData,
  purpose,
  setIsOffBoardSideBar,
  onSelectOffBoardingScope,
  selectOffboadingScope,
}) => {
  const searchValue: string = existingProjectDetailsFormData?.searchValue ?? '';
  const selectedProjectKey: string = existingProjectDetailsFormData?.selectedProjectKey ?? '';
  const existingProject: any | null = existingProjectDetailsFormData?.existingProject ?? null;

  const ertmProjectIds: string[] = data?.result?.ETRM_Project_Id ?? [];
  const projectCodeNames: string[] = data?.result?.project_code_names ?? [];
  const dropdownOptions = Array.from(new Set([...ertmProjectIds, ...projectCodeNames]));
  const isValidSelection = (value: string) => dropdownOptions.includes(value.trim());
  const handleInvalidSelection = () => {
    if (!searchValue.trim()) return;
    if (!isValidSelection(searchValue)) {
      alert('Please select a valid ETRM Project ID or Project Code Name from the list.');
    }
  };

  useEffect(() => {
    if (!selectedProjectKey) return;
    const loadMetadata = async () => {
      try {
        const response = await fetchExistingProjectMetadata(selectedProjectKey);
        const metadata =
          response?.result?.existing_record_id ?? response?.result ?? response ?? null;
        setExistingProjectDetailsFormData((prev: any) => ({
          ...prev,
          existingProject: metadata,
        }));
        onMetadataLoaded?.(response ?? null);
      } catch (error) {
        setExistingProjectDetailsFormData((prev: any) => ({
          ...prev,
          existingProject: null,
        }));
        onMetadataLoaded?.(null);
      }
    };
    loadMetadata();
  }, [selectedProjectKey]);
  useEffect(() => {
    if (purpose === 'offboarding') {
      setIsOffBoardSideBar(true);
    } else {
      setIsOffBoardSideBar(false);
    }
  });

  const hasMatch = Boolean(existingProject);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Project Overview {selectOffboadingScope === 'tools' ? '(Read-Only)' : ''}
        </h2>
        <p className={styles.description}>
          Search & select existing project. You can search by ETRM Project ID or Project Code Name.
        </p>

        <div className={styles.infoAlertBlue}>
          <AlertIcon />
          <span>Please confirm Project Details before proceeding with offboarding request.</span>
        </div>
      </div>

      {/* Project Search Section */}
      <div className={styles.searchSection}>
        <label className="flex items-center gap-1 font-['Roboto',sans-serif] font-medium text-[#4a4a4a] text-sm relative group">
          ERTM Project ID / Project Code Name
          <span className="text-[#cb282e] ml-1">*</span>
        </label>

        <div className="relative w-1/3 mt-1.5">
          <input
            type="text"
            value={searchValue}
            onChange={(e) =>
              setExistingProjectDetailsFormData((prev: any) => ({
                ...prev,
                searchValue: e.target.value,
              }))
            }
            onInput={(e) => {
              const nextValue = (e.target as HTMLInputElement).value;
              if (isValidSelection(nextValue)) {
                setExistingProjectDetailsFormData((prev: any) => ({
                  ...prev,
                  selectedProjectKey: nextValue.trim(),
                }));
              } else {
                setExistingProjectDetailsFormData((prev: any) => ({
                  ...prev,
                  selectedProjectKey: '',
                  existingProject: null,
                }));
                onMetadataLoaded?.(null);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleInvalidSelection();
              }
            }}
            list="existing-project-options"
            className="w-full h-8 px-2 pr-8 border border-[#ccc] rounded bg-white font-['Roboto',sans-serif] text-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#498e2b] focus:border-transparent"
          />
          <datalist id="existing-project-options">
            {dropdownOptions.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
          <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4a4a4a]" />
        </div>
      </div>

      {/* Read-Only Project Details Display */}
      {hasMatch && (
        <div className={styles.detailsGrid}>
          <div className={styles.detailCard}>
            <p className={styles.detailLabel}>ERTM Project ID</p>
            <p className={styles.detailValue}>{selectedProjectKey}</p>
          </div>
          <div className={styles.detailCard}>
            <p className={styles.detailLabel}>SAP Project ID</p>
            <p className={styles.detailValue}>
              {existingProject?.sap_project_id ?? existingProject?.sapProjectId ?? ''}
            </p>
          </div>
          <div className={styles.detailCard}>
            <p className={styles.detailLabel}>Project Code Name</p>
            <p className={styles.detailValue}>
              {existingProject?.project_code_name ??
                existingProject?.codename ??
                existingProject?.projectCodeName ??
                ''}
            </p>
          </div>
          <div className={styles.detailCard}>
            <p className={styles.detailLabel}>Project Type</p>
            <p className={styles.detailValue}>
              {existingProject?.project_type ?? existingProject?.projectType ?? ''}
            </p>
          </div>
          <div className={styles.detailCard}>
            <p className={styles.detailLabel}>Estimated Start Date</p>
            <p className={styles.detailValue}>
              {formatDate(
                existingProject?.estimated_start_date ?? existingProject?.estimatedStartDate ?? ''
              )}
            </p>
          </div>
          <div className={styles.detailCard}>
            <p className={styles.detailLabel}>Estimated End Date</p>
            <p className={styles.detailValue}>
              {formatDate(
                existingProject?.estimated_end_date ?? existingProject?.estimatedEndDate ?? ''
              )}
            </p>
          </div>
          <div className={styles.detailCard}>
            <p className={styles.detailLabel}>Personal or Protected Data Involved?</p>
            <p className={styles.detailValue}>
              {existingProject?.are_you_planning_to_use_any_personal_or_protected_data ??
                existingProject?.personalOrprotectedData ??
                ''}
            </p>
          </div>
          <div className={styles.detailCard}>
            <p className={styles.detailLabel}>Describe your project and its goals</p>
            <p className={styles.detailValue}>
              {existingProject?.please_describe ?? existingProject?.description ?? ''}
            </p>
          </div>
        </div>
      )}
      {purpose === 'offboarding' && (
        <OffboardingScope
          onSelectOffBoardingScope={onSelectOffBoardingScope}
          selectOffboadingScope={selectOffboadingScope}
        />
      )}
    </div>
  );
};
