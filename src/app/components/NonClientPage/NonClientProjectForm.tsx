import React, { useState } from 'react';
import './NonClientProjectForm.css';
import svgPaths from '../../../imports/svg-m590sprq1z';
import styles from '../../components/ActionButtons/ActionButtons.module.css';
interface NonClientProjectFormProps {
  onContinue: (existingProject: string) => void;
  purpose: string;
  setPurpose: React.Dispatch<React.SetStateAction<any>>;
  setPageTittle: React.Dispatch<React.SetStateAction<any>>;
}

const NonClientProjectForm: React.FC<NonClientProjectFormProps> = ({
  onContinue,
  purpose,
  setPurpose,
  setPageTittle,
}) => {
  const [existingProject, setExistingProject] = useState<string>('');

  const AlertIcon: React.FC = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={svgPaths.p341e8200} fill="#006176" />
    </svg>
  );

  return (
    <div className="form-container">
      <header className="form-header">
        <h1>Non Client Project</h1>
        <p className="section-description">
          Use this form to request tool access for a non-client project. Your selections determine
          the approval and fulfilment workflow.
        </p>
      </header>

      <section className="form-section">
        <h2>Request Classification</h2>
        <p className="section-description">
          Answer the questions below to route your request to the appropriate workflow.
        </p>

        {/* Existing Project */}
        {
          <>
            <div className="question-block">
              <h3 className="question-label">1.Do you have an existing project?</h3>
              <p className="question-description">
                Select whether this request applies to an existing project or a new project.
              </p>

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
                      setPageTittle('Project & Offboarding Scope');
                    }}
                  />
                  <div className="radio-content">
                    <div className="radio-title">Yes</div>
                    <div className="radio-description">
                      This request applies to an existing project
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
                    <div className="radio-title">No</div>
                    <div className="radio-description">
                      Set up a new project and request tool and user access
                    </div>
                  </div>
                </label>
              </div>

              {existingProject === 'no' && (
                <div className="info-alert-blue">
                  <AlertIcon />
                  <span>
                    {' '}
                    This request will create a new project and initiate onboarding.{' '}
                  </span>{' '}
                </div>
              )}
            </div>

            {existingProject === 'yes' && (
              <div className="question-block">
                <h3 className="question-label">2.What is the purpose of this request?</h3>
                <p className="question-description">
                  Select whether you are requesting new access or removing existing access.
                </p>

                <div className="radio-group">
                  <label className={`radio-card ${purpose === 'onboarding' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="purpose"
                      value="onboarding"
                      checked={purpose === 'onboarding'}
                      onChange={(e) => setPurpose(e.target.value)}
                    />
                    <div className="radio-content">
                      <div className="radio-title">Onboarding</div>
                      <div className="radio-description">Request new tool & user access</div>
                    </div>
                  </label>

                  <label className={`radio-card ${purpose === 'offboarding' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="purpose"
                      value="offboarding"
                      checked={purpose === 'offboarding'}
                      onChange={(e) => setPurpose(e.target.value)}
                    />
                    <div className="radio-content">
                      <div className="radio-title">Offboarding</div>
                      <div className="radio-description">Revoke tool, user, or project access</div>
                    </div>
                  </label>
                </div>

                {purpose === 'onboarding' && (
                  <div className="info-alert">
                    <AlertIcon />
                    <span>
                      This request will add new tools or user access to an existing project and
                      follow the onboarding approval workflow.
                    </span>
                  </div>
                )}
                {purpose === 'offboarding' && (
                  <div className="info-alert">
                    <AlertIcon />
                    <span>
                      This request will revoke tool access, user access,or project access for an
                      existing non-client project
                    </span>
                  </div>
                )}
              </div>
            )}
          </>
        }
      </section>

      {/* Buttons */}
      <div className="button-group">
        <button className={`${styles.button} ${styles.discardButton}`}>Back to Dashboard</button>
        <button
          className={`${styles.button} ${styles.continueButton}`}
          onClick={() => onContinue(existingProject)}
        >
          Continue to Form
        </button>
      </div>
    </div>
  );
};

export default NonClientProjectForm;
