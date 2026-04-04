import React, { useState } from 'react';
import ETRFDetails from './ETRFDetails';
import './ClientEngagementForm.css';
import svgPaths from '../../../imports/svg-m590sprq1z';
import styles from '../../components/ActionButtons/ActionButtons.module.css';
import { Search } from 'lucide-react';
import { fetchETRFdata, fetchETRFClientProjectdata } from '../../service/api';

interface ClientEngagementFormProps {
  onContinue: (existingProject: string, ironcladId: string) => void;
  purpose: string;
  setPurpose: React.Dispatch<React.SetStateAction<any>>;
  setPageTittle: React.Dispatch<React.SetStateAction<any>>;
  token: string;
  onPrefillETRFDetails?: (ironcladData: any) => void;
    ironclacId :string
    setIronclacId : React.Dispatch<React.SetStateAction<string>>;
      existingProject: string;
      setExistingProject:React.Dispatch<React.SetStateAction<string>>;
}

const ClientEngagementForm: React.FC<ClientEngagementFormProps> = ({
  onContinue,
  purpose,
  setPurpose,
  setPageTittle,
  token,
  onPrefillETRFDetails,
  ironclacId,
  setIronclacId,
  existingProject, 
  setExistingProject
}) => {
  console.log("ironclacId",ironclacId)
  // const [existingProject, setExistingProject] = useState<string>('');
  console.log("existingProject",existingProject)
  // const [ironclacId, setIronclacId] = useState<string>('');
  const [etrfClientProjectData, setEtrfClientProjectData] = useState<any>(null);
  const [isUnableToProvide, setIsUnableToProvide] = useState<boolean>(false);
  const [noMatchingId, setNoMatchingId] = useState<boolean>(false);
  const [matchFound, setMatchFound] = useState<boolean>(false);
  const [ironcladSuggestions, setIroncladSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const AlertIcon: React.FC = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={svgPaths.p341e8200} fill="#006176" />
    </svg>
  );

  const isFormValid = !isUnableToProvide ? ironclacId : true;
  const isContinueDisabled = !isFormValid;

  React.useEffect(() => {
    console.log("Fetching suggestions for:", ironclacId);
    if (!ironclacId || ironclacId.length < 2) {
      setIroncladSuggestions([]);
      return;
    }
    let active = true;
    setLoadingSuggestions(true);
    const handler = setTimeout(async () => {
      try {
        // Always prefix with 'IC-'
        const response = await fetchETRFdata(`IC-${ironclacId}`, token);
        const allIds = response?.result?.ironcladID || [];
        // Filter suggestions containing the input (case-insensitive, after 'IC-')
        const filtered = allIds.filter((id: string) => id.toLowerCase().includes(ironclacId.toLowerCase()));
        if (active) setIroncladSuggestions(filtered);
      } catch (e) {
        if (active) setIroncladSuggestions([]);
      } finally {
        if (active) setLoadingSuggestions(false);
      }
    }, 300);
    return () => {
      active = false;
      clearTimeout(handler);
    };
  }, [ironclacId, token]);

  return (
    <div className="form-container">
      <header className="form-header">
        <h1>Engagement Technology Request Form</h1>
        <p className="section-description">
          Manage technology & access requests for Client ETRF.
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

      {/* Ironclad ID Section: Only show if an option is selected */}
      {(existingProject === 'yes' || existingProject === 'no') && (
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
                  setMatchFound(false);
                  setNoMatchingId(false);
                }}
                placeholder="Please start typing to search & select an Ironclad ID"
                className="w-full h-8 pl-8 pr-8 border border-[#ccc] rounded bg-white font-['Roboto',sans-serif] text-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#498e2b] focus:border-transparent"
                autoComplete="off"
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4a4a4a]" />
              {loadingSuggestions && (
                <div className="absolute left-0 right-0 top-10 bg-white border border-[#ccc] rounded shadow p-2 text-xs text-[#727272]">Loading...</div>
              )}
              {ironcladSuggestions.length > 0 && (
                <ul className="absolute left-0 right-0 top-10 bg-white border border-[#ccc] rounded shadow z-10 max-h-40 overflow-auto">
                  {ironcladSuggestions.map((id) => (
                    <li
                      key={id}
                      className="px-3 py-2 cursor-pointer hover:bg-[#f6f6f6] text-sm text-[#4a4a4a]"
                      onMouseDown={(e) => {
                        // Use onMouseDown to ensure selection before input blur
                        e.preventDefault();
                        setIronclacId(id.replace(/^IC-/, ''));
                        setIroncladSuggestions([]); // Hide suggestions
                        setMatchFound(true);
                        setNoMatchingId(false);
                      }}
                    >
                      {id}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="additional-info mt-1.5 text-xs text-[#727272]">
              Select the Ironclad ID associated with engagement.
            </p>

            {/* Show black no match message below input, matching screenshot, only if no match found */}
            {ironclacId && !loadingSuggestions && ironcladSuggestions.length === 0 && !matchFound && (
              <p className="mt-2 text-[16px] text-[#333] font-normal">
                <span className="font-bold">No matching</span> Ironclad ID was found for <span className="font-bold">IC-{ironclacId}</span>.
              </p>
            )}

            {matchFound && (
              <div className="info-alert-blue">
                <AlertIcon />
                <span>
                  {' '}
                  Ironclad ID IC-{ironclacId} was found. Since there is no existing ETRF, please click
                  continue to create a new ETRF.
                </span>{' '}
              </div>
            )}

            {noMatchingId && (
              <p className="text-l mt-1">
                No matching <span className="font-medium">Ironclad ID</span> was found for{' '}
                <span className="font-medium">IC-{ironclacId}</span>.
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
      )}

      {/* Buttons */}
      <div className="button-group">
        <button className={`${styles.button} ${styles.discardButton}`}>Back to Dashboard</button>
        <button
          className={`${styles.button} ${styles.continueButton} ${isContinueDisabled ? styles.disabledButton : ''}`}
          onClick={async () => {
            // If Ironclad ID is selected and suggestions were fetched, try to prefill
            if (matchFound && ironclacId && onPrefillETRFDetails) {
              try {
                const response = await fetchETRFdata(`IC-${ironclacId}`, token);
                if (response?.result?.ironcladData) {
                  onPrefillETRFDetails(response.result);
                }
              } catch (e) {
                // ignore
              }
            }
            if (ironclacId) {
              try {
                const data = await fetchETRFClientProjectdata(token);
                setEtrfClientProjectData(data);
                console.log('ETRF Client Project Data:', data);
              } catch (e) {
                console.error('Error fetching ETRF client project data:', e);
              }
            }
            onContinue(existingProject, ironclacId);
          }}
          disabled={isContinueDisabled}
        >
          Continue
        </button>
      </div>
      {/* Example usage: Pass etrfClientProjectData to ETRFDetails if you render it here */}
      {/*
      <ETRFDetails
        formData={...}
        clientProjectData={...}
        handleChange={...}
        etrfClientProjectData={etrfClientProjectData}
      />
      */}
    </div>
  );
};

export default ClientEngagementForm;
