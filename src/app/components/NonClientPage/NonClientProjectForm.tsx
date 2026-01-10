import React, { useState } from 'react';
import './NonClientProjectForm.css';

interface NonClientProjectFormProps {
  onContinue: () => void;
}

const NonClientProjectForm: React.FC<NonClientProjectFormProps> = ({ onContinue }) => {
  const [purpose, setPurpose] = useState<string>('');
  const [existingProject, setExistingProject] = useState<string>('');

  const handlePurposeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurpose(e.target.value);
    console.log('Purpose selected:', e.target.value);
  };

  const handleExistingProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExistingProject(e.target.value);
    console.log('Existing Project selected:', e.target.value);
  };

  const isContinueDisabled = !purpose || (purpose === 'onboarding' && !existingProject);

  return (
    <div className="form-container">
      <header className="form-header">
        <h1>Non Client Project</h1>
        <p>
          Use this form to request tool access for a non-client project. Your selections determine
          the approval and fulfilment workflow.
        </p>
      </header>

      <section className="form-section">
        <h2>Request Classification</h2>
        <p className="section-description">
          Answer below questions to help us route your request appropriately.
        </p>

        {/* Purpose */}
        <div className="question-block">
          <h3 className="question-label">1. What is the purpose of this request?</h3>
          <p className="question-description">
            Select whether you are requesting new access or removing existing access.
          </p>
          <div className="radio-group">
            <label className="radio-card">
              <input
                type="radio"
                name="purpose"
                value="onboarding"
                checked={purpose === 'onboarding'}
                onChange={handlePurposeChange}
              />
              <div className="radio-content">
                <div className="radio-title">Onboarding</div>
                <div className="radio-description">Request new tool & user access</div>
              </div>
            </label>

            <label className="radio-card">
              <input
                type="radio"
                name="purpose"
                value="offboarding"
                checked={purpose === 'offboarding'}
                onChange={handlePurposeChange}
              />
              <div className="radio-content">
                <div className="radio-title">Offboarding</div>
                <div className="radio-description">Revoke tool, user, or project access</div>
              </div>
            </label>
          </div>
        </div>

        {/* Existing Project */}
        {purpose === 'onboarding' && (
          <div className="question-block">
            <h3 className="question-label">2. Is this request associated with an existing project?</h3>
            <p className="question-description">
              Choose whether to link this request to an existing project or create a new project
            </p>
            <div className="radio-group">
              <label className="radio-card">
                <input
                  type="radio"
                  name="existingProject"
                  value="yes"
                  checked={existingProject === 'yes'}
                  onChange={handleExistingProjectChange}
                />
                <div className="radio-content">
                  <div className="radio-title">Yes</div>
                  <div className="radio-description">Link to existing project</div>
                </div>
              </label>

              <label className="radio-card">
                <input
                  type="radio"
                  name="existingProject"
                  value="no"
                  checked={existingProject === 'no'}
                  onChange={handleExistingProjectChange}
                />
                <div className="radio-content">
                  <div className="radio-title">No</div>
                  <div className="radio-description">Create a new one</div>
                </div>
              </label>
            </div>

            {existingProject === 'no' && (
              <div className="info-alert">
                <svg
                  className="alert-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>This request will create a new project and initiate onboarding.</span>
              </div>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="button-group">
          <button className="btn secondary" type="button">
            Back to Dashboard
          </button>
          <button
            className="btn primary"
            type="button"
            disabled={isContinueDisabled}
            onClick={onContinue}
          >
            Continue to Form
          </button>
        </div>
      </section>
    </div>
  );
};

export default NonClientProjectForm;
