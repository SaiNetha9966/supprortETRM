import React, { useEffect, useState } from 'react';
import { fetchNonClientNewProject, submitNonClientNewProject } from '../service/api';
import { Header } from './Header/Header';
import { Sidebar } from './SideBar/Sidebar';
import { SubmissionSuccess } from './SubmissionSuccess/SubmissionSuccess';
import { ProjectSetup } from './ProjectSetup/ProjectSetup';
import NonClientProjectForm from './NonClientPage/NonClientProjectForm';
import { ExistingProjectDetails } from './ExistingProjectDetails/ExistingProjectDetails';
import { ProjectDetails } from './ProjectDetails/ProjectDetails';
import { ActionButtons } from './ActionButtons/ActionButtons';
import ExistingToolConfiguration from './ToolConfiguration/ExistingToolConfiguration';
import ToolConfiguration from './ToolConfiguration/ToolConfiguration';
import { AccessApproval } from './AccessAndApproval/AccessApproval';
import ReviewSubmit from './ReviewAndSubmit/ReviewSubmit';
import styles from '../../app/App.module.css';
import OffboardingScope from './ExistingProjectDetails/OffboardingScope';
import { OffBoardingSideBar } from './SideBar/OffBoardingSideBar';
import { ImpactAccess } from './ImpactAccess/ImpactAccess';
import { OffBoardReview } from './OffboardReview/OffBoardReview';
import { DataHandling } from './DataHandling/DataHandling';

type StepType =
  | 'newclient-intro'
  | 'project-details'
  | 'tool-configuration'
  | 'access-approval'
  | 'review-submit'
  | 'submission-success'
  | '';


export default function MainComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<StepType>('newclient-intro');
  const [purpose, setPurpose] = useState<string>('');
  const [pageTittle, setPageTittle] = useState('Project Details');
  const [pageDesc, setPageDesc] = useState(
    'Provide project details to initiate setup. This process may take a few minutes.'
  );
  const [existingProject, setExistingProject] = useState<string>('');
  const [existingProjectMetadata, setExistingProjectMetadata] = useState<any | null>(null);
  const [isOffBoardSideBar, setIsOffBoardSideBar] = useState<boolean>(false);
  const [selectOffboadingScope, setSelectOffboadingScope] = useState<string>('');
  console.log('selectOffboadingScope', selectOffboadingScope);
    const [selectedOption, setSelectedOption] = useState<string>('');
  console.log("selectedOption",selectedOption)
    const handleRemoveOption = (value: string) => {
    setSelectedOption(value);
  };
  const handleSelectOffBoardingScope = (value: string) => {
    setSelectOffboadingScope(value);
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleDiscard = () => {
    setCurrentStep('project-details');
    setPageTittle('Project Details');
  };

  const handleNonClientContinue = (projectType: string) => {
    setExistingProject(projectType);
    setCurrentStep('project-details');
    if (projectType === 'yes') {
      setPageDesc('Add tools or user access to an existing non-client project');
    } else {
      setPageTittle('Project Details');
      setPageDesc(
        'Provide project details to initiate setup. This process may take a few minutes.'
      );
    }
  };

  const handleContinue = async () => {
    if (
      currentStep === 'project-details' &&
      existingProject === 'yes' &&
      existingProjectDetailsFormData?.selectedProjectKey &&
      purpose === 'offboarding'
    ) {
      return;
    }

    switch (currentStep) {
      case 'project-details':
        setCurrentStep('tool-configuration');
        setPageTittle(purpose === 'offboarding' ? 'Impact Access' : 'Tool Configuration');
        if (existingProject === 'yes') {
          setPageDesc(
            'Add new tools to the existing project. Existing tools are shown for reference.'
          );
        } else {
          setPageDesc(
            'Select and configure the tools required for this project. You can request custom tools or choose from approved, recommended tools.'
          );
        }
        break;
      case 'tool-configuration':
       
        if(selectOffboadingScope === "users")
        {
          setCurrentStep('review-submit');
        }
        else{
           setCurrentStep('access-approval');
        }
        if (existingProject === 'yes') {
          // setPageTittle(purpose === 'offboarding' ? 'Data Handling' : 'Update Existing Project');
          setPageTittle( purpose === "offboarding" ? (selectOffboadingScope === "users" ? "Review & Submit" : "Data Handling") : "Update Existing Project" );
          setPageDesc('This process could take a few minutes');
        } else if (purpose === 'offboarding') {
          setPageTittle('Impact Access');
        } else {
        setCurrentStep('access-approval');
          setPageTittle('Approval & Access');
          setPageDesc(
            'Define approvers and assign user access for the selected tools. This step may take a few minutes.'
          );
        }
        break;
      case 'access-approval':
        setCurrentStep('review-submit');
        setPageTittle('Review & Submit');
        setPageDesc('Review all details below before submitting this request for approval.');
        break;
      case 'review-submit':
        // On submit, go to success page
        try {
          const existingRecord =
            existingProjectMetadata?.result?.existing_record_id ??
            existingProjectMetadata?.result ??
            existingProjectMetadata ??
            null;
          const payload =
            existingProject === 'yes'
              ? {
                  ...formData,
                  number:
                    existingProjectDetailsFormData?.selectedProjectKey || formData.ertmProjectId,
                  ertmProjectId:
                    existingProjectDetailsFormData?.selectedProjectKey || formData.ertmProjectId,
                  sapProjectId: existingRecord?.sap_project_id ?? formData.sapProjectId,
                  projectCodeName: existingRecord?.project_code_name ?? formData.projectCodeName,
                  projectType: existingRecord?.project_type ?? formData.projectType,
                  estimatedStartDate:
                    existingRecord?.estimated_start_date ?? formData.estimatedStartDate,
                  estimatedEndDate: existingRecord?.estimated_end_date ?? formData.estimatedEndDate,
                  personalOrprotectedData:
                    existingRecord?.are_you_planning_to_use_any_personal_or_protected_data ??
                    formData.personalOrprotectedData,
                  description: existingRecord?.please_describe ?? formData.description,
                  selectedTools: existingToolFormData?.selectedTools ?? formData.selectedTools,
                  customToolRequest:
                    existingToolFormData?.customToolRequest ?? formData.customToolRequest,
                  toolsSpecifications:
                    existingToolFormData?.toolsSpecifications ?? formData.toolsSpecifications,
                }
              : formData;
          console.log('Submission payload:', payload);
          const response = await submitNonClientNewProject(payload); // <-- call your POST API
          console.log('Submission response:', response);
          console.log('Submission successful:', response);
          setCurrentStep('submission-success'); // move to success page
        } catch (error) {
          console.error('Error submitting project:', error);
        }
        break;
      case 'newclient-intro':
        setCurrentStep('project-details');
        setPageTittle('Project Details');
        setPageDesc(
          'Provide project details to initiate setup. This process may take a few minutes.'
        );
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'tool-configuration':
        setCurrentStep('project-details');
        const tittleName =
          purpose === 'offboarding' ? 'Project & Offboarding Scope' : 'Project Details';
        setPageTittle(tittleName);
        setPageDesc(
          'Provide project details to initiate setup. This process may take a few minutes.'
        );
        break;
      case 'access-approval':
        setCurrentStep('tool-configuration');
        purpose === 'offboarding' ? 'Impact Access' : 'Tool Configuration';
        setPageTittle(purpose === 'offboarding' ? 'Impact Access' : 'Tool Configuration');
        setPageDesc(
          'Select and configure the tools required for this project. You can request custom tools or choose from approved, recommended tools.'
        );
        break;
      case 'review-submit':
        setCurrentStep('access-approval');
        // setPageTittle('Approval & Access');
        setPageTittle(purpose === 'offboarding' ? 'Data Handlig' : 'Approval & Access');
        setPageDesc(
          'Define approvers and assign user access for the selected tools. This step may take a few minutes.'
        );
        break;
      case 'project-details':
        setIsOffBoardSideBar(false);
        setCurrentStep('newclient-intro');
        break;
      default:
        break;
    }
  };

  const handleDashboardReturn = () => {
    // Reset to initial state or navigate to dashboard
    setCurrentStep('newclient-intro');
    setPageTittle('Project Details');
    setPageDesc('Provide project details to initiate setup. This process may take a few minutes.');
  };

  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const token = '';
    async function loadData() {
      try {
        const result = await fetchNonClientNewProject(token);
        setData(result);
      } catch (err) {
        console.error('Failed to load data', err);
      }
    }
    loadData();
  }, []);

  const [formData, setFormData] = useState({
    ertmProjectId: 'PRJ-8YV03FK',
    sapProjectId: '',
    projectCodeName: '',
    projectType: '',
    estimatedStartDate: '', // ISO YYYY-MM-DD
    estimatedEndDate: '',
    personalOrprotectedData: '',
    description: '',
    selectedTools: [],
    customToolRequest: '',
    toolsSpecifications: [],
    primaryPmdPartner: '',
    secondoryPmdPartner: '',
    informationOwner: '',
    delegateIformationOwner: '',
    projectManager: '',
    approvers: '',
    userSelectionsAndToolAcees: [],
    nameValuePairs: [],
    memoToApprovainMd: '',
    confirmation: false,
  });
  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const [existingToolFormData, setExistingToolFormData] = useState({
    selectedTools: [],
    toolsSpecifications: [],
    customToolRequest: '',
  });
  const [existingProjectDetailsFormData, setExistingProjectDetailsFormData] = useState({
    searchValue: '',
    selectedProjectKey: '',
    existingProject: null,
  });

  const toolConfigIsIncomplete = (tools: any[]) =>
    tools.some((tool) => {
      const trust = (tool?.trustExternalDomain ?? '').toString().trim();
      if (!trust) return true;
      if (trust === 'yes') {
        const domain = (tool?.externalDomainName ?? '').toString().trim();
        return !domain;
      }
      return false;
    });

  const selectedToolsForConfig =
    existingProject === 'yes'
      ? (existingToolFormData?.selectedTools ?? [])
      : (formData?.selectedTools ?? []);
  const disableToolConfigContinue =
    selectedToolsForConfig.length > 0 && toolConfigIsIncomplete(selectedToolsForConfig);

  const isEmptyValue = (value: any) => {
    if (Array.isArray(value)) return value.length === 0;
    return !String(value ?? '').trim();
  };

  const disableAccessApprovalContinue = [
    formData?.primaryPmdPartner,
    formData?.secondoryPmdPartner,
    formData?.informationOwner,
    formData?.delegateIformationOwner,
    formData?.projectManager,
    formData?.approvers,
  ].some(isEmptyValue);

  return (
    <>
      <div className={styles.app}>
        <Header onMenuToggle={toggleSidebar} />

        {purpose === 'offboarding'
          ? isOffBoardSideBar && (
              <OffBoardingSideBar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
                currentStep={currentStep}
                existingProject={existingProject}
              />
            )
          : currentStep !== 'newclient-intro' &&
            currentStep !== 'submission-success' && (
              <Sidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
                currentStep={currentStep}
                existingProject={existingProject}
              />
            )}
        {currentStep === 'submission-success' && (
          <SubmissionSuccess onDashboard={handleDashboardReturn} />
        )}
        <main className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            {currentStep !== 'newclient-intro' && currentStep !== 'submission-success' && (
              <ProjectSetup
                pageTittle={pageTittle}
                pageDesc={pageDesc}
                formData={formData}
                currentStep={currentStep}
                existingProject={existingProject}
                existingProjectMetadata={existingProjectMetadata}
                existingToolFormData={existingToolFormData}
              />
            )}
            {/* Step 0: Non-Client Intro */}
            {currentStep === 'newclient-intro' && (
              <div className={styles.centerWrapper}>
                <NonClientProjectForm
                  purpose={purpose}
                  setPurpose={setPurpose}
                  onContinue={handleNonClientContinue}
                  setPageTittle={setPageTittle}
                />
              </div>
            )}

            {/* Step 1: Project Details */}
            {currentStep === 'project-details' && (
              <>
                {existingProject === 'yes' ? (
                  <ExistingProjectDetails
                    data={data}
                    onMetadataLoaded={setExistingProjectMetadata}
                    existingProjectDetailsFormData={existingProjectDetailsFormData}
                    setExistingProjectDetailsFormData={setExistingProjectDetailsFormData}
                    purpose={purpose}
                    setIsOffBoardSideBar={setIsOffBoardSideBar}
                    onSelectOffBoardingScope={handleSelectOffBoardingScope}
                    selectOffboadingScope={selectOffboadingScope}
                  />
                ) : (
                  <ProjectDetails formData={formData} handleChange={handleChange} data={data} />
                )}
                <ActionButtons
                  onDiscard={handleBack}
                  onContinue={handleContinue}
                  isContinueDisabled={true}
                  // disableContinue={existingProject === 'yes'
                  //   ? !existingProjectDetailsFormData?.selectedProjectKey
                  //   : !formData?.projectCodeName}
                />
              </>
            )}

            {/* Step 2: Tool Configuration */}
            {currentStep === 'tool-configuration' && (
              <>
                {existingProject === 'yes' ? (
                  purpose === 'offboarding' ? (
                    <ImpactAccess 
                    selectedOption={selectedOption}
                    onRemoveOptionChange={handleRemoveOption}
                    selectOffboadingScope={selectOffboadingScope} />
                  ) : (
                    <ExistingToolConfiguration
                      data={data}
                      existingProjectMetadata={existingProjectMetadata}
                      existingToolFormData={existingToolFormData}
                      setExistingToolFormData={setExistingToolFormData}
                    />
                  )
                ) : (
                  <ToolConfiguration
                    formData={formData}
                    setFormData={setFormData}
                    handleChange={handleChange}
                    data={data}
                  />
                )}
                <ActionButtons
                  onDiscard={handleDiscard}
                  onBackButton={handleBack}
                  onContinue={handleContinue}
                  isBackButtinShoewn={true}
                  isContinueDisabled={true}
                  // disableContinue={disableToolConfigContinue}
                />
              </>
            )}

            {/* Step 3: Access & Approval */}
            {currentStep === 'access-approval' && (
              <>
                {purpose === 'offboarding' ? (
                 <DataHandling selectOffboadingScope={selectOffboadingScope} />
                ) : (
                  <AccessApproval
                    formData={formData}
                    setFormData={setFormData}
                    handleChange={handleChange}
                    existingProject={existingProject}
                    data={data}
                    existingProjectMetadata={existingProjectMetadata}
                    existingToolFormData={existingToolFormData}
                  />
                )}
                <ActionButtons
                  onDiscard={handleDiscard}
                  onBackButton={handleBack}
                  onContinue={handleContinue}
                  isBackButtinShoewn={true}
                  isContinueDisabled={true}
                  //  disableContinue={disableAccessApprovalContinue}
                />
              </>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 'review-submit' && (
              <>
                {purpose === 'offboarding' ? (
                  <OffBoardReview selectOffboadingScope={selectOffboadingScope} />
                ) : (
                  <ReviewSubmit
                    onSubmit={handleContinue}
                    onDiscard={handleDiscard}
                    onBack={handleBack}
                    existingProject={existingProject}
                    formData={formData}
                    data={data}
                    existingProjectMetadata={existingProjectMetadata}
                    existingProjectDetailsFormData={existingProjectDetailsFormData}
                    existingToolFormData={existingToolFormData}
                    handleChange={handleChange}
                  />
                )}

                <ActionButtons
                  onDiscard={handleDiscard}
                  onBackButton={handleBack}
                  onContinue={handleContinue}
                  isBackButtinShoewn={true}
                  isSubmitDisabled={true}
                  // disableContinue={!formData.confirmation}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
