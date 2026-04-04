import React, { useEffect, useRef } from 'react';
import styles from '../ProjectDetails/ProjectDetails.module.css';
import { SearchInput } from '../../components/AccessAndApproval/SearchInput';
import svgPaths from '../../../imports/svg-m590sprq1z';

interface ETRFDetailsProps {
  formData: any;
  clientProjectData: any;
  handleChange: (field: string, value: any) => void;
  etrfClientProjectData?: any;
  onSaveDraft?: () => void;
}

const DateIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={styles.dateIcon}>
    <path d={svgPaths.p24a05d00} fill="#4A4A4A" />
  </svg>
);

export default function ETRFDetails({
  formData,
  clientProjectData,
  handleChange,
  onSaveDraft,
}: ETRFDetailsProps) {
  const projectCodeNames = Array.isArray(clientProjectData?.result?.project_code_names)
    ? [...clientProjectData.result.project_code_names].sort((a, b) => a.localeCompare(b))
    : [];


  // Project Code Name search input state
  const [projectCodeNameInput, setProjectCodeNameInput] = React.useState(formData.projectCodeName || '');
  const [projectCodeNameSuggestions, setProjectCodeNameSuggestions] = React.useState<string[]>([]);
  const [showProjectCodeSuggestions, setShowProjectCodeSuggestions] = React.useState(true);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Client Name search input state
  const [clientNameInput, setClientNameInput] = React.useState(formData.clientName || '');
  const [clientNameSuggestions, setClientNameSuggestions] = React.useState<string[]>([]);
  const [showClientNameSuggestions, setShowClientNameSuggestions] = React.useState(false);
  const clientNameWrapperRef = useRef<HTMLDivElement | null>(null);

  // Suggestions logic
  const getProjectCodeSuggestions = (input: string) => {
    if (!input) return [];
    return projectCodeNames.filter((name) =>
      name.toLowerCase().includes(input.toLowerCase())
    );
  };
  const getClientNameSuggestions = (input: string) => {
    if (!input || !Array.isArray(formData.clientNameOptions)) return [];
    return formData.clientNameOptions.filter((name: string) =>
      name.toLowerCase().includes(input.toLowerCase())
    );
  };

  useEffect(() => {
    if (!showProjectCodeSuggestions) return;
    setProjectCodeNameSuggestions(getProjectCodeSuggestions(projectCodeNameInput));
  }, [projectCodeNameInput, projectCodeNames, showProjectCodeSuggestions]);

  useEffect(() => {
    setProjectCodeNameInput(formData.projectCodeName || '');
  }, [formData.projectCodeName]);

  useEffect(() => {
    if (!showClientNameSuggestions) return;
    setClientNameSuggestions(getClientNameSuggestions(clientNameInput));
  }, [clientNameInput, formData.clientNameOptions, showClientNameSuggestions]);

  useEffect(() => {
    setClientNameInput(formData.clientName || '');
  }, [formData.clientName]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setProjectCodeNameSuggestions([]);
        setShowProjectCodeSuggestions(false);
      }
      if (clientNameWrapperRef.current && !clientNameWrapperRef.current.contains(event.target as Node)) {
        setClientNameSuggestions([]);
        setShowClientNameSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const startDateRef = useRef<HTMLInputElement | null>(null);
  const endDateRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!formData.etrfId) {
      const randomSuffix = Math.random().toString(36).substring(2, 9).toUpperCase();
      handleChange('etrfId', `ETRF-${randomSuffix}`);
    }
  }, [formData.etrfId]);

  const openPicker = (ref: React.RefObject<HTMLInputElement | null>) => {
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>ETRF Details</h2>
        <p className={styles.description}>
          Define project scope, timeline, and requirements
        </p>
      </div>

      {/* Row 1 */}
      <div className={styles.formRow}>
        <div className={styles.formGroup} style={{ flex: 1, minWidth: 0 }}>
          <label className={styles.label}>Ironclad ID</label>
          <input
            type="text"
            className={styles.input}
            value={`IC-${formData.ironcladId || ''}`}
            onChange={(e) => handleChange('ironcladId', e.target.value.replace(/^IC-/, ''))}
            disabled
          />
        </div>

        <div ref={clientNameWrapperRef} className={styles.formGroup} style={{ flex: 1, minWidth: 0, position: 'relative' }}>
          <SearchInput
            label="Client Name"
            value={clientNameInput}
            required
            placeholder="Select or type client name"
            onChange={(val: string) => {
              setClientNameInput(val);
              handleChange('clientName', val);
              setShowClientNameSuggestions(true);
            }}
          />
          {showClientNameSuggestions && clientNameSuggestions.length > 0 && (
            <ul
              style={{
                position: 'absolute',
                zIndex: 10,
                background: 'white',
                border: '1px solid #ccc',
                borderRadius: 4,
                marginTop: 2,
                width: '100%',
                maxHeight: 180,
                overflowY: 'auto',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              {clientNameSuggestions.map((name, idx) => (
                <li
                  key={name}
                  style={{ padding: '8px', cursor: 'pointer' }}
                  onClick={() => {
                    setClientNameInput(name);
                    handleChange('clientName', name);
                    setClientNameSuggestions([]);
                    setShowClientNameSuggestions(false);
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.formGroup} style={{ flex: 1, minWidth: 0 }}>
          <label className={styles.label}>Type of Work</label>
          <select
            className={styles.select}
            value={formData.typeOfWork || ''}
            onChange={(e) => handleChange('typeOfWork', e.target.value)}
          >
            <option value="" hidden></option>
            {Array.isArray(formData.typeOfWorkOptions) && formData.typeOfWorkOptions.length > 0 &&
              formData.typeOfWorkOptions.map((option: string) => (
                <option key={option} value={option}>{option}</option>
              ))}
          </select>
        </div>
      </div>

      {/* Row 2 */}
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Radius ID</label>
          <select
            className={styles.select}
            value={formData.radiusId || ''}
            onChange={(e) => handleChange('radiusId', e.target.value)}
          >
            <option value="" hidden></option>
            <option value="radius-1">Radius 1</option>
            <option value="radius-2">Radius 2</option>
            <option value="radius-3">Radius 3</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>SAP Project ID</label>
          <input
            type="text"
            className={styles.input}
            value={formData.sapProjectId || ''}
            onChange={(e) => handleChange('sapProjectId', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>ETRF ID</label>
          <input type="text" className={styles.input} value={formData.etrfId || ''} disabled />
        </div>
      </div>

      {/* Row 3 */}
      <div className={styles.formRow}>
        <div ref={wrapperRef} className={styles.formGroup} style={{ position: 'relative' }}>
          <SearchInput
            label="Project Code Name"
            value={projectCodeNameInput}
            required
            placeholder="Select a name from the list, or add a new one."
            onChange={(val: string) => {
              setProjectCodeNameInput(val);
              handleChange('projectCodeName', val);
              setShowProjectCodeSuggestions(true);
            }}
          />

          {showProjectCodeSuggestions && projectCodeNameSuggestions.length > 0 && (
            <ul
              style={{
                position: 'absolute',
                zIndex: 10,
                background: 'white',
                border: '1px solid #ccc',
                borderRadius: 4,
                marginTop: 2,
                width: '100%',
                maxHeight: 180,
                overflowY: 'auto',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              {projectCodeNameSuggestions.map((name, idx) => (
                <li
                  key={name}
                  style={{ padding: '8px', cursor: 'pointer' }}
                  onClick={() => {
                    setProjectCodeNameInput(name);
                    handleChange('projectCodeName', name);
                    setProjectCodeNameSuggestions([]);
                    setShowProjectCodeSuggestions(false); // 🔥 FIX
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Dates */}
        <div className={styles.formGroup} style={{ minWidth: 220, flex: 1 }}>
          <label className={styles.label}>Expected Start Date</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className={styles.dateInput} style={{ flex: 1, display: 'flex', alignItems: 'center', cursor: 'pointer', border: '1px solid #ccc', borderRadius: 4, padding: '0 8px', height: 36, background: '#fff' }}>
              <DateIcon />
              <input
                ref={startDateRef}
                type="date"
                value={formData.estimatedStartDate || ''}
                onChange={e => handleChange('estimatedStartDate', e.target.value)}
                className={styles.input}
                style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, marginLeft: 8, fontSize: 15, height: 32, padding: 0 }}
              />
            </div>
          </div>
        </div>

        <div className={styles.formGroup} style={{ minWidth: 220, flex: 1 }}>
          <label className={styles.label}>Expected End Date</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className={styles.dateInput} style={{ flex: 1, display: 'flex', alignItems: 'center', cursor: 'pointer', border: '1px solid #ccc', borderRadius: 4, padding: '0 8px', height: 36, background: '#fff' }}>
              {/* <DateIcon /> */}
              <input
                ref={endDateRef}
                type="date"
                value={formData.estimatedEndDate || ''}
                onChange={e => handleChange('estimatedEndDate', e.target.value)}
                className={styles.input}
                style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, marginLeft: 8, fontSize: 15, height: 32, padding: 0 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Project Description</label>
        <textarea
          className={styles.textarea}
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          maxLength={80}
        />
        <div className={styles.wordCounter}>
          {(formData.description || '').length}/80
        </div>
      </div>
    </div>
  );
}