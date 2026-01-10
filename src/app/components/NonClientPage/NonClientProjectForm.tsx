import React, { useState } from 'react';
import './NonClientProjectForm.css';

const NonClientProjectForm: React.FC = () => {
    const [purpose, setPurpose] = useState<string>("");
    const [existingProject, setExistingProject] = useState<string>("");

    const handlePurposeChange = (value: string) => {
        setPurpose(value);
        console.log('Purpose selected:', value);
    };

    const handleExistingProjectChange = (value: string) => {
        setExistingProject(value);
        console.log('Existing Project selected:', value);
    };

    return (
        <div className="form-container">
            <header className="form-header">
                <h1>Non Client Project</h1>
                <p>Use this form to request tool access for a non-client project. Your selections determine the approval and fulfilment workflow.</p>
            </header>

            <section className="form-section">
                <h2>Request Classification</h2>
                <p className="section-description">Answer below questions to help us route your request appropriately.</p>

                <div className="question-block">
                    <h3 className="question-label">1. What is the purpose of this request?</h3>
                    <p className="question-description">Select whether you are requesting new access or removing existing access.</p>
                    <div className="radio-group">
                        <label className="radio-card">
                            <input
                                type="radio"
                                name="purpose"
                                value="onboarding"
                                checked={purpose === 'onboarding'}
                                onChange={() => setPurpose('onboarding')}
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
                                onChange={() => setPurpose('offboarding')}
                            />
                            <div className="radio-content">
                                <div className="radio-title">Offboarding</div>
                                <div className="radio-description">Revoke tool, user, or project access</div>
                            </div>
                        </label>
                    </div>
                </div>

                {purpose === "onboarding" && (
                    <div className="question-block">
                        <h3 className="question-label">2. Is this request associated with an existing project?</h3>
                        <p className="question-description">Choose whether to link this request to an existing project or create a new project</p>
                        <div className="radio-group">
                            <label className="radio-card">
                                <input
                                    type="radio"
                                    name="existingProject"
                                    value="yes"
                                    checked={existingProject === 'yes'}
                                    onChange={() => setExistingProject('yes')}
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
                                    onChange={() => setExistingProject('no')}
                                />
                                <div className="radio-content">
                                    <div className="radio-title">No</div>
                                    <div className="radio-description">Create a new one</div>
                                </div>
                            </label>
                        </div>
                    </div>
                )}

                <div className="button-group">
                    <button className="btn secondary">Back to Dashboard</button>
                    <button 
                        className="btn primary" 
                        disabled={!purpose || (purpose === "onboarding" && !existingProject)}
                    >
                        Continue to Form
                    </button>
                </div>
            </section>
        </div>
    );
};

export default NonClientProjectForm;