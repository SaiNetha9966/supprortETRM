import React, { useState } from 'react';
import './ClientEngagementForm.css';
import svgPaths from '../../../imports/svg-m590sprq1z';
import styles from '../../components/ActionButtons/ActionButtons.module.css';
import { Search } from 'lucide-react';
interface ClientEngagementFormProps {
  onContinue: (existingProject: string) => void;
  purpose: string;
  setPurpose: React.Dispatch<React.SetStateAction<any>>;
  setPageTittle: React.Dispatch<React.SetStateAction<any>>;
}

const ClientEngagementForm: React.FC<ClientEngagementFormProps> = ({
  onContinue,
  purpose,
  setPurpose,
  setPageTittle,
}) => {
  const [existingProject, setExistingProject] = useState<string>('');
  const [ironclacId, setIronclacId] = useState<string>('');
  const [isUnableToProvide, setIsUnableToProvide] = useState<boolean>(false);
  const [noMatchingId, setNoMatchingId] = useState<boolean>(false);
  const [matchFound, setMatchFound] = useState<boolean>(false);

  const AlertIcon: React.FC = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={svgPaths.p341e8200} fill="#006176" />
    </svg>
  );

  const isFormValid = !isUnableToProvide ? ironclacId : true;
  const isContinueDisabled = !isFormValid;

  return (
    <div className="form-container">
      <header className="form-header">
        <h1>Engagement Technology Request Form</h1>
        <p className="section-description">
          Manage technology & access requests for Client Engagements
        </p>
      </header>

      <section className="form-section">
        <h2>What would you like to do?</h2>

        {
          <>
            <div className="question-block">
              <div className="radio-group">
                <label className={`radio-card ${existingProject === 'yes' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="existingProject"
                    value="yes"
                    checked={existingProject === 'yes'}
                    onChange={(e) => {
                      setExistingProject(e.target.value);
                      setPurpose('');
                      setPageTittle('ETRF & Data Details');
                    }}
                  />
                  <div className="radio-content">
                    <div className="radio-title">Start a New ETRF</div>
                    <div className="radio-description">
                      Create a technology request for a new client engagement.
                    </div>
                  </div>
                </label>

                <label className={`radio-card ${existingProject === 'no' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="existingProject"
                    value="no"
                    checked={existingProject === 'no'}
                    onChange={(e) => {
                      setExistingProject(e.target.value);
                      setPurpose('');
                    }}
                  />
                  <div className="radio-content">
                    <div className="radio-title">Update Existing ETRF</div>
                    <div className="radio-description">
                      Onboard or Offboard technology & access for an existing ETRF.
                    </div>
                  </div>
                </label>
              </div>

            </div>
          </>
        }
      </section>

      <section className="form-section">
        <h2>Ironclad ID</h2>
        <p className="section-description">
          We require an Ironclad ID for all Technology Requests.
        </p>
        <div className="ironclad-search-section">
          <div className="relative w-full max-w-sm mt-1.5">
            <label className="absolute left-2 top-1/2 -translate-y-1/2 font-['Roboto',sans-serif] font-medium text-sm text-[#4a4a4a] pointer-events-none">
              IC -
            </label>
            <input
              type="text"
              value={ironclacId}
              onChange={(e) => {
                const value = e.target.value;
                setIronclacId(value);
                const isMatch = value === '45821';
                setMatchFound(isMatch);
                setNoMatchingId(value.length > 0 && !isMatch);
              }}
              placeholder="Please start typing to search & select an Ironclad ID"
              className="w-full h-8 pl-8 pr-8 border border-[#ccc] rounded bg-white font-['Roboto',sans-serif] text-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#498e2b] focus:border-transparent"
            />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4a4a4a]" />
          </div>

          <p className="additional-info mt-1.5 text-xs text-[#727272]">
            Select the Ironclad ID associated with engagement.
          </p>
          
          {matchFound && (
            <div className="info-alert-blue">
              <AlertIcon />
              <span>
                {' '}
                Ironclad ID IC-{ironclacId} was found. Since there is no existing ETRF, please click continue to create a new ETRF.
              </span>{' '}
            </div>
          )}
          
          {noMatchingId && (
            <p className="text-l mt-1">
              No matching <span className="font-medium">Ironclad ID</span> was found for <span className="font-medium">IC-{ironclacId}</span>.
            </p>
          )}
        </div>

        <div className="checkbox-section mt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isUnableToProvide}
              onChange={(e) => setIsUnableToProvide(e.target.checked)}
              className="w-4 h-4 rounded-sm accent-[#498e2b]"
            />
            <p className="font-normal text-[14px] text-[#4a4a4a] leading-none">
              I am not able to provide the above information at this time.
            </p>
          </label>
        </div>
      </section>

      {/* Buttons */}
      <div className="button-group">
        <button className={`${styles.button} ${styles.discardButton}`}>Back to Dashboard</button>
        <button
          className={`${styles.button} ${styles.continueButton} ${isContinueDisabled ? styles.disabledButton : ''}`}
          onClick={() => onContinue(existingProject)}
          disabled={isContinueDisabled}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ClientEngagementForm;
