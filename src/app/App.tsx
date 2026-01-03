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
        break;
      case 'tool-configuration':
        setCurrentStep('access-approval');
        setPageTittle('Access & Approval');
        break;
      case 'access-approval':
        setCurrentStep('review-submit');
        setPageTittle('Review & Submit');
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
          <ProjectSetup pageTittle={pageTittle} />

          {/* Step 1: Project Details */}
          {currentStep === 'project-details' && (
            <>
              <ProjectDetails />
              <ActionButtons onDiscard={handleDiscard} onContinue={handleContinue} />
            </>
          )}

          {/* Step 2: Tool Configuration */}
          {currentStep === 'tool-configuration' && (
            <>
              <ToolConfiguration />
              <ActionButtons onDiscard={handleDiscard} onContinue={handleContinue} />
            </>
          )}

          {/* Step 3: Access & Approval */}
          {currentStep === 'access-approval' && (
            <>
              <AccessApproval/>
              <ActionButtons onDiscard={handleDiscard} onContinue={handleContinue} />
            </>

          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 'review-submit' && (
            <ReviewSubmit
              onSubmit={handleContinue}
              onDiscard={handleDiscard}
              onBack={handleBack}
            />
          )}
        </div>
      </main>
    </div>
  );
}