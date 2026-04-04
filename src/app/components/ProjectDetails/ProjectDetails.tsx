import React, { useRef, useState } from 'react';
import styles from './ProjectDetails.module.css';
import svgPaths from '../../../imports/svg-m590sprq1z';
import { formatDate } from '../Utils/UiUtilis';

interface ProjectDetailsProps {
  data?: any;
  formData: any;
  handleChange: (field: string, value: any) => void;
  onSaveDraft?: () => void;
}

const DateIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={styles.dateIcon}>
    <path d={svgPaths.p24a05d00} fill="#4A4A4A" />
  </svg>
);

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  data,
  formData,
  handleChange,
  onSaveDraft,
}) => {
  const [charCount, setCharCount] = useState(0);
  const [projectCodeNameWarning, setProjectCodeNameWarning] = useState('');

  const startDateRef = useRef<HTMLInputElement | null>(null);
  const endDateRef = useRef<HTMLInputElement | null>(null);

  const formattedStart = formatDate(formData?.estimatedStartDate);
  const formattedEnd = formatDate(formData?.estimatedEndDate);

  const isEndDateBeforeStart = (start?: string, end?: string) => {
    if (!start || !end) return false;
    return end < start;
  };

  const openPicker = (ref: React.RefObject<HTMLInputElement | null>) => {
    if (!ref) return;
    const el = ref.current;
    if (!el) return;
    // @ts-ignore
    if (typeof el.showPicker === 'function') {
      // @ts-ignore
      el.showPicker();
    } else {
      el.focus();
      el.click();
    }
  };

  // Helper: normalize string for comparison
  const normalize = (str: string) => (str || '').toLowerCase().replace(/\s+/g, ' ').trim();

  // Helper: check if input matches or partially matches any in list
  const isPartialOrFullMatch = (input: string, list: string[]) => {
    const normInput = normalize(input);
    if (!normInput) return false;
    // Full match
    if (list.some((item) => normalize(item) === normInput)) return true;
    // Partial match: all words in input appear in order in any item
    const inputWords = normInput.split(' ');
    return list.some((item) => {
      const normItem = normalize(item);
      // All input words must appear in order in normItem
      let lastIdx = -1;
      for (const word of inputWords) {
        const idx = normItem.indexOf(word, lastIdx + 1);
        if (idx === -1) return false;
        lastIdx = idx;
      }
      return true;
    });
  };

  // Project code name validation handler (on Enter)
  const validateProjectCodeName = (value: string) => {
    const available = data?.result?.available_project_code_names || [];
    const reserved = data?.result?.reserved_project_code_names || [];
    const all = [...available, ...reserved];
    setProjectCodeNameWarning('');
    if (!value) {
      handleChange('projectCodeName', value);
      return;
    }
    // Full match with available or reserved
    if (all.some((item) => normalize(item) === normalize(value))) {
      setProjectCodeNameWarning('This code name is already in use or reserved.');
      alert('This code name is already in use or reserved.');
      return;
    }
    // Partial match warning
    if (isPartialOrFullMatch(value, all)) {
      setProjectCodeNameWarning('Warning: Your entry closely matches an existing or reserved code name.');
      alert('Warning: Your entry closely matches an existing or reserved code name.');
      return;
    }
    handleChange('projectCodeName', value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>ITRF Details</h2>
        <p className={styles.description}>Define project scope, timeline, and requirements</p>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Project Code Name <span className={styles.required}>*</span>
          </label>
          <input
            className={styles.select}
            type="text"
            list="project-code-names"
            value={formData.projectCodeName}
            onChange={(e) => {
              setProjectCodeNameWarning('');
              handleChange('projectCodeName', e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                validateProjectCodeName(e.currentTarget.value);
              }
            }}
            placeholder="Type or select a code name"
            autoComplete="off"
          />
          <datalist id="project-code-names">
            {data?.result?.available_project_code_names?.map((id: string) => (
              <option key={id} value={id} />
            ))}
          </datalist>
          <p className={styles.additionalInfo}>Select a name from the list, or add a new one.</p>
                {projectCodeNameWarning && (
                  <p style={{ color: 'orange', fontSize: '0.9em', marginTop: 4 }}>{projectCodeNameWarning}</p>
                )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>SAP Project ID</label>
          <select
            className={styles.select}
            value={formData.sapProjectId}
            onChange={(e) => handleChange('sapProjectId', e.target.value)}
          >
            <option value="" hidden></option>
            {data?.result?.sap_project_ids?.map((id: string) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
          <p className={styles.additionalInfo}>If unavailable, you may proceed and update later.</p>
        </div>

        <div className={styles.formGroup}>
          <label className={`${styles.label} ${styles.labelGray}`}>ERTM Project ID</label>
          <input
            type="text"
            className={styles.input}
            value={formData.ertmProjectId || ''}
            disabled
          />
          <p className={`${styles.additionalInfo} ${styles.additionalInfoGray}`}>
            Auto Generated by ServiceNow
          </p>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Project Type<span className={styles.required}>*</span></label>
          <select
            className={styles.select}
            value={formData.projectType}
            onChange={(e) => handleChange('projectType', e.target.value)}
          >
            <option value="" hidden></option>
            {data?.result?.what_type_of_project?.map((type: { label: string; value: string }) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Estimated Start Date</label>

          <input
            ref={startDateRef}
            type="date"
            value={formattedStart ? formData.estimatedStartDate : ''}
            onChange={(e) => {
              const nextStart = e.target.value;
              handleChange('estimatedStartDate', nextStart);
              if (isEndDateBeforeStart(nextStart, formData?.estimatedEndDate)) {
                alert('Estimated End Date should be on or after Estimated Start Date.');
                handleChange('estimatedEndDate', '');
              }
            }}
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0 0 0 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
            aria-hidden={false}
          />

          <div
            className={styles.dateInput}
            onClick={() => openPicker(startDateRef)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openPicker(startDateRef);
              }
            }}
          >
            <DateIcon />
            <input
              type="text"
              readOnly
              value={formattedStart}
              placeholder=""
              className={styles.input}
              style={{
                border: 'none',
                padding: 0,
                margin: 0,
                background: 'transparent',
                color: '#282926',
                cursor: 'pointer',
              }}
              aria-label="Estimated start date"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Estimated End Date</label>

          <input
            ref={endDateRef}
            type="date"
            value={formattedEnd ? formData.estimatedEndDate : ''}
            min={formData?.estimatedStartDate || undefined}
            onChange={(e) => {
              const nextEnd = e.target.value;
              if (isEndDateBeforeStart(formData?.estimatedStartDate, nextEnd)) {
                alert('Estimated End Date should be on or after Estimated Start Date.');
                return;
              }
              handleChange('estimatedEndDate', nextEnd);
            }}
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0 0 0 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
            aria-hidden={false}
          />

          <div
            className={styles.dateInput}
            onClick={() => openPicker(endDateRef)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openPicker(endDateRef);
              }
            }}
          >
            <DateIcon />
            <input
              type="text"
              readOnly
              value={formattedEnd}
              placeholder=""
              className={styles.input}
              style={{
                border: 'none',
                padding: 0,
                margin: 0,
                background: 'transparent',
                color: '#282926',
                cursor: 'pointer',
              }}
              aria-label="Estimated end date"
            />
          </div>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Personal or Protected Data Involved?</label>
          <select
            className={styles.select}
            value={formData.personalOrprotectedData}
            onChange={(e) => handleChange('personalOrprotectedData', e.target.value)}
          >
            <option value="" hidden></option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>ITRF Description</label>
        <div className={styles.textareaWrapper}>
          <textarea
            className={styles.textarea}
            value={formData.description}
            onChange={(e) => {
              setCharCount(e.target.value.length);
              handleChange('description', e.target.value);
            }}
            maxLength={80}
          />
          <div className={styles.wordCounter}>{charCount}/80</div>
        </div>
      </div>
    </div>
  );
};
