import React from 'react';
import { Info } from 'lucide-react';
import styles from '../ProjectDetails/ProjectDetails.module.css';

interface DataDetailsProps {
  formData: any;
  clientProjectData : any;
  handleChange: (field: string, value: any) => void;
  onSaveDraft?: () => void;
}

export default function DataDetails({ formData, clientProjectData, handleChange, onSaveDraft }: DataDetailsProps) {
  const countryList = Array.isArray(clientProjectData?.result?.country_of_origin)
    ? [...clientProjectData.result.country_of_origin].sort((a, b) => a.localeCompare(b))
    : [];

  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader} style={{ marginTop: 0 }}>
        <h2 className={styles.title}>Data Details</h2>
        <p className={styles.description}>Please provide the necessary data details.</p>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            What data volume do you expect (in GB)? <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            min="0"
            className={styles.input}
            value={formData.dataVolume || ''}
            onChange={e => handleChange('dataVolume', e.target.value.replace(/[^0-9.]/g, ''))}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Country of Origin of the Data? <span className={styles.required}>*</span>
          </label>
          <select
            className={styles.select}
            value={formData.dataCountryOrigin || ''}
            onChange={(e) => handleChange('dataCountryOrigin', e.target.value)}
          >
            <option value="" hidden></option>
            {countryList.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Does the client permit data transfer abroad? <span className={styles.required}>*</span>
          </label>
          <select
            className={styles.select}
            value={formData.dataTransferAbroad || ''}
            onChange={(e) => handleChange('dataTransferAbroad', e.target.value)}
          >
            <option value="" hidden></option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Privacy/Security Requirements</label>
        <div className={styles.checkboxGrid}>
          {[
            { key: 'tar', label: 'TAR' },
            { key: 'soc2', label: 'SOC 2' },
            { key: 'gdpr', label: 'GDPR' },
            { key: 'sox', label: 'SOX' },
            { key: 'iso27001', label: 'ISO27001' },
            { key: 'ear', label: 'EAR' },
            { key: 'ccpa2018', label: 'CCPA 2018' },
            { key: 'other', label: 'Other/Client Specific' },
          ].map((item) => (
            <label key={item.key} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.privacyRequirements?.[item.key] || false}
                onChange={(e) =>
                  handleChange('privacyRequirements', {
                    ...(formData.privacyRequirements || {}),
                    [item.key]: e.target.checked,
                  })
                }
                className={styles.checkboxInput}
              />
              {item.label}
              <Info size={16} className="text-[#4a4a4a] shrink-0" />
            </label>
          ))}
        </div>
      </div>

      <div className={styles.formGroup} style={{ marginTop: '32px' }}>
        <label className={styles.label}>Data Types Being Collected</label>
        <div className={styles.checkboxGrid}>
          {[
            { key: 'personalData', label: 'Personal data' },
            { key: 'npi', label: 'Non-public information (NPI)' },
            { key: 'pci', label: 'Payment card industry data (PCI-DSS)' },
            { key: 'phi', label: 'Personal health information (PHI)' },
            { key: 'sensitiveData', label: 'Client sensitive/intellectual property data' },
          ].map((item) => (
            <label key={item.key} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.dataTypes?.[item.key] || false}
                onChange={(e) =>
                  handleChange('dataTypes', {
                    ...(formData.dataTypes || {}),
                    [item.key]: e.target.checked,
                  })
                }
                className={styles.checkboxInput}
              />
              {item.label}
              <Info size={16} className="text-[#4a4a4a] shrink-0" />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
