import React, { useState } from 'react';
import styles from './App.module.css';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/SideBar/Sidebar';
import { ProjectSetup } from './components/ProjectSetup/ProjectSetup';
import { ProjectDetails } from './components/ProjectDetails/ProjectDetails';
import { ActionButtons } from './components/ActionButtons/ActionButtons';
import ToolConfiguration from './components/ToolConfiguration/ToolConfiguration';
import { AccessApproval } from './components/AccessAndApproval/AccessApproval';
import { ReviewSubmit } from './components/ReviewAndSubmit/ReviewSubmit';

type StepType = 'project-details' | 'tool-configuration' | 'access-approval' | 'review-submit';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<StepType>('project-details');
  console.log('Current Step:', currentStep);
  const [pageTittle, setPageTittle] = useState('Project Details');
  const [pageDesc, setPageDesc] = useState('Provide project details to initiate setup. This process may take a few minutes.');
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleDiscard = () => {
    console.log('Discard clicked');
    // Reset to first step
    setCurrentStep('project-details');
    setPageTittle('Project Details');

  };

  const handleContinue = () => {
    console.log('Continue clicked from step:', currentStep);
    switch (currentStep) {
      case 'project-details':
        setCurrentStep('tool-configuration');
        setPageTittle('Tool Configuration');
        setPageDesc("Select and configure the tools required for this project. This step may take a few minutes.");
        break;
      case 'tool-configuration':
        setCurrentStep('access-approval');
        setPageTittle('Access & Approval');
        setPageDesc("Define approvers and assign user access for the selected tools. This step may take a few minutes.");
        break;
      case 'access-approval':
        setCurrentStep('review-submit');
        setPageTittle('Review & Submit');
        setPageDesc("Review all details below before submitting this request for approval.");
        break;
      case 'review-submit':
        setCurrentStep('project-details');
        setPageTittle('Project Details');
        break;
      case 'tool-configuration':
        setCurrentStep('access-approval');
        break;
      case 'access-approval':
        setCurrentStep('review-submit');
        break;
      case 'review-submit':
        setCurrentStep('project-details');
        break;
    }
  };

  const handleBack = () => {
    console.log('Back clicked from step:', currentStep);

    switch (currentStep) {
      case 'tool-configuration':
        setCurrentStep('project-details');
        break;
      case 'access-approval':
        setCurrentStep('tool-configuration');
        break;
      case 'review-submit':
        setCurrentStep('access-approval');
        break;
    }
  };

  return (
    <div className={styles.app}>
      <Header onMenuToggle={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} currentStep={currentStep} />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <ProjectSetup pageTittle={pageTittle} pageDesc={pageDesc} />

          {/* Step 1: Project Details */}
          {currentStep === 'project-details' && (
            <>
              <ProjectDetails />
              <ActionButtons onDiscard={handleDiscard} onContinue={handleContinue} isContinueDisabled={true} />
            </>
          )}

          {/* Step 2: Tool Configuration */}
          {currentStep === 'tool-configuration' && (
            <>
              <ToolConfiguration />
              <ActionButtons onDiscard={handleDiscard} onContinue={handleContinue} isBackButtinShoewn={true} isContinueDisabled={true} />
            </>
          )}

          {/* Step 3: Access & Approval */}
          {currentStep === 'access-approval' && (
            <>
              <AccessApproval />
              <ActionButtons onDiscard={handleDiscard} onContinue={handleContinue} isBackButtinShoewn={true} isContinueDisabled={true} />
            </>

          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 'review-submit' && (
            <>
              <ReviewSubmit
                onSubmit={handleContinue}
                onDiscard={handleDiscard}
                onBack={handleBack}
              />
              <ActionButtons onDiscard={handleDiscard} onContinue={handleContinue} isBackButtinShoewn={true} isSubmitDisabled={true} />
            </>

          )}
        </div>
      </main>
    </div>
  );
}