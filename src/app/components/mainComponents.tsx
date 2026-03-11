import React, { useEffect, useState } from 'react';
import { fetchNonClientNewProject, submitNonClientNewProject, submitOffboardingRequest } from '../service/api';
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
import { DataHandlingTool, OffBoardConfirmationState, OffBoardFormData } from './Utils/UiUtilis';

type StepType =
  | 'newclient-intro'
  | 'project-details'
  | 'tool-configuration'
  | 'access-approval'
  | 'review-submit'
  | 'submission-success'
  | '';

interface MainComponentProps {
  nonClientNewProjectData: any;
  token:string;
}

export const MainComponent: React.FC<MainComponentProps> = ({ nonClientNewProjectData,token }) => {
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
  const [isDraftProject, setIsDraftProject] = useState<boolean>(false);

  const handleMetadataLoaded = (metadata: any) => {
    setExistingProjectMetadata(metadata);
    const state = metadata?.result?.existing_record_id?.state;
    const isDraft = state == 0; // Use loose equality for string or number
    console.log('Metadata loaded, state:', state, 'isDraft:', isDraft);
    setIsDraftProject(isDraft);
    if (isDraft) {
      const record = metadata?.result?.existing_record_id;
      const projectTypes = nonClientNewProjectData?.result?.what_type_of_project || [];
      const foundProjectType = projectTypes.find((t: any) => t.label === record?.what_type_of_project);
      setFormData({
        ...formData,
        ertmProjectId: existingProjectDetailsFormData?.selectedProjectKey || formData.ertmProjectId,
        sapProjectId: record?.sap_project_id || formData.sapProjectId,
        projectCodeName: record?.project_code_name || formData.projectCodeName,
        projectType: foundProjectType?.value || formData.projectType,
        estimatedStartDate: record?.estimated_start_date || formData.estimatedStartDate,
        estimatedEndDate: record?.estimated_end_date || formData.estimatedEndDate,
        personalOrprotectedData: (record?.are_you_planning_to_use_any_personal_or_protected_data || '').toLowerCase() || formData.personalOrprotectedData,
        description: record?.please_describe || formData.description,
        selectedTools: record?.selected_tools || formData.selectedTools,
        customToolRequest: record?.custom_tool_request || formData.customToolRequest,
        toolsSpecifications: record?.tools_specifications || formData.toolsSpecifications,
        primaryPmdPartner: record?.managing_director || formData.primaryPmdPartner,
        secondoryPmdPartner: record?.secondary_managing_director || formData.secondoryPmdPartner,
        informationOwner: record?.md || formData.informationOwner,
        delegateIformationOwner: record?.delegated_information_owner || formData.delegateIformationOwner,
        projectManager: record?.project_manager || formData.projectManager,
        approvers: record?.approvers || formData.approvers,
        userSelectionsAndToolAcees: Array.isArray(record?.namevalue) ? record.namevalue : formData.userSelectionsAndToolAcees,
        memoToApprovainMd: record?.custom || formData.memoToApprovainMd,
        confirmation: record?.confirmation || formData.confirmation,
        state: 0,
      });
    }
  };

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedOffBoardngImpactTools, setSelectedOffBoardingImpactTools] = useState<string[]>([]);
  const [toolsNameChecked, setToolNameChecked] = useState<boolean>(false);
  const [dataHandlingtools, setDataHandlingTools] = useState<DataHandlingTool[]>([]);
  const [offBoardconfirmation, setOffBoardConfirmation] = useState<OffBoardConfirmationState>({
    isAuthorized: false,
    isIunderstand: false,
    isIacknowledge: false,
  });

  const [draftProjectId, setDraftProjectId] = useState<string | null>(null);
  const [saveDraftLoading, setSaveDraftLoading] = useState(false);
  const [submissionResponse, setSubmissionResponse] = useState<any>(null);


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

  const handleSaveDraft = async () => {
    if (saveDraftLoading) return;
    
    setSaveDraftLoading(true);
    try {
      const existingRecord = existingProjectMetadata?.result?.existing_record_id
        ?? existingProjectMetadata?.result
        ?? existingProjectMetadata
        ?? null;
        
      const payload = existingProject === 'yes'
        ? {
            ...formData,
            number: draftProjectId || existingProjectDetailsFormData?.selectedProjectKey || formData.ertmProjectId,
            ertmProjectId: draftProjectId || existingProjectDetailsFormData?.selectedProjectKey || formData.ertmProjectId,
            sapProjectId: existingRecord?.project_id ?? formData.sapProjectId,
            projectCodeName: existingRecord?.project_code_name ?? formData.projectCodeName,
            projectType: existingRecord?.project_type ?? formData.projectType,
            estimatedStartDate: existingRecord?.estimated_start_date ?? formData.estimatedStartDate,
            estimatedEndDate: existingRecord?.estimated_end_date ?? formData.estimatedEndDate,
            personalOrprotectedData: existingRecord?.are_you_planning_to_use_any_personal_or_protected_data ?? formData.personalOrprotectedData,
            description: existingRecord?.short_description ?? formData.description,
            selectedTools: existingToolFormData?.selectedTools ?? formData.selectedTools,
            customToolRequest: existingToolFormData?.customToolRequest ?? formData.customToolRequest,
            toolsSpecifications: existingToolFormData?.toolsSpecifications ?? formData.toolsSpecifications,
            inDraft: true,
            state: 0,
          }
        : { 
            ...formData, 
            number: draftProjectId || formData.ertmProjectId,
            ertmProjectId: draftProjectId || formData.ertmProjectId,
            inDraft: true,
            state: 0,
          };
      
      console.log('Draft payload:', payload);
      const response = await submitNonClientNewProject(payload, token);
      console.log('Draft save response:', response);
      
      if (response?.result?.project_number && !draftProjectId) {
        setDraftProjectId(response.result.project_number);
        setFormData({ ...formData, ertmProjectId: response.result.project_number });
      }
      
      alert('Draft saved successfully!');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft. Please try again.');
    } finally {
      setSaveDraftLoading(false);
    }
  };

  const isProjectDetailsModified = () => {
    return !!(
      formData?.sapProjectId ||
      formData?.projectCodeName ||
      formData?.projectType ||
      formData?.estimatedStartDate ||
      formData?.estimatedEndDate ||
      formData?.personalOrprotectedData ||
      formData?.description
    );
  };

  const isToolConfigModified = () => {
    if (existingProject === 'yes') {
      return !!(
        existingToolFormData?.selectedTools?.length > 0 ||
        existingToolFormData?.customToolRequest ||
        existingToolFormData?.toolsSpecifications?.length > 0
      );
    }
    return !!(
      formData?.selectedTools?.length > 0 ||
      formData?.customToolRequest ||
      formData?.toolsSpecifications?.length > 0
    );
  };

  const isAccessApprovalModified = () => {
    return !!(
      formData?.primaryPmdPartner ||
      formData?.secondoryPmdPartner ||
      formData?.informationOwner ||
      formData?.delegateIformationOwner ||
      formData?.projectManager ||
      formData?.approvers ||
      formData?.userSelectionsAndToolAcees?.length > 0
    );
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
    // if (
    //   currentStep === 'project-details' &&
    //   existingProject === 'yes' &&
    //   existingProjectDetailsFormData?.selectedProjectKey &&
    //   purpose === 'offboarding'
    // ) {
    //   console.log("if")
    //   return;
    // }

    switch (currentStep) {
      case 'project-details':
        setCurrentStep('tool-configuration');
        setPageTittle(purpose === 'offboarding' ? 'Impact Access' : 'Tool Configuration');
        console.log("else")
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
          setCurrentStep('access-approval');
        if (existingProject === 'yes') {
          // setPageTittle(purpose === 'offboarding' ? 'Data Handling' : 'Update Existing Project');
          setPageTittle(
            purpose === 'offboarding'
              ?  'Data Handling'
              : 'Update Existing Project'
          );
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
                  number: draftProjectId || existingProjectDetailsFormData?.selectedProjectKey || formData.ertmProjectId,
                  ertmProjectId: draftProjectId || existingProjectDetailsFormData?.selectedProjectKey || formData.ertmProjectId,
                  sapProjectId: existingRecord?.project_id ?? formData.sapProjectId,
                  projectCodeName: existingRecord?.project_code_name ?? formData.projectCodeName,
                  projectType: existingRecord?.project_type ?? formData.projectType,
                  estimatedStartDate:
                    existingRecord?.estimated_start_date ?? formData.estimatedStartDate,
                  estimatedEndDate: existingRecord?.estimated_end_date ?? formData.estimatedEndDate,
                  personalOrprotectedData:
                    existingRecord?.are_you_planning_to_use_any_personal_or_protected_data ??
                    formData.personalOrprotectedData,
                  description: existingRecord?.short_description ?? formData.description,
                  selectedTools: existingToolFormData?.selectedTools ?? formData.selectedTools,
                  customToolRequest:
                    existingToolFormData?.customToolRequest ?? formData.customToolRequest,
                  toolsSpecifications:
                    existingToolFormData?.toolsSpecifications ?? formData.toolsSpecifications,
                  state: 1,
                }
              : formData;
          console.log('Submission payload:', payload);
          const response = await submitNonClientNewProject(payload,token); // <-- call your POST API
          console.log('Submission response:', response);
          console.log('Submission successful:', response);
          setSubmissionResponse(response);
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

  // const [data, setData] = useState<any>(null);
  // useEffect(() => {
  //   const token = '';
  //   async function loadData() {
  //     try {
  //       const result = await fetchNonClientNewProject(token);
  //       setData(result);
  //     } catch (err) {
  //       console.error('Failed to load data', err);
  //     }
  //   }
  //   loadData();
  // }, []);


  const handleOffBoardingFormSubmit = async () => {
    // dummy payload matching backend spec
      const searchValue: string = existingProjectDetailsFormData?.searchValue ?? '';

    const payload = {
      number: searchValue,
      state: '1',
      request_status: 'Offboarding - Requested',
      substate: 'Archive',
      offboard_namevalue: [
        {
          'Vismit Ambre': ['Azure OpenAI'],
          'Navneet Agarwal': ['Azure OpenAI'],
        },
      ],
    };
    // dummy payload 
    try {
      const response = await submitOffboardingRequest(payload, token);
      console.log('Offboarding API success:', response);
    } catch (error) {
      console.error('Offboarding API error:', error);
    }
  }


  const [formData, setFormData] = useState({
    ertmProjectId: '',
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
  const offBoardFormData: OffBoardFormData = {
    sapProjectId: formData?.ertmProjectId,
    selectOffboadingScope,
    selectedOption,
    selectedOffBoardngImpactTools,
    toolsNameChecked,
    dataHandlingtools,
    offBoardconfirmation,
  };
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
                purpose={purpose}
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
          <SubmissionSuccess onDashboard={handleDashboardReturn} apiResponse={submissionResponse} />
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
                purpose={purpose}
                offBoardFormData={offBoardFormData}
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
                {existingProject === 'yes' && existingProjectMetadata?.result?.existing_record_id?.state != 0 ? (
                  <ExistingProjectDetails
                    data={nonClientNewProjectData}
                    onMetadataLoaded={handleMetadataLoaded}
                    existingProjectDetailsFormData={existingProjectDetailsFormData}
                    setExistingProjectDetailsFormData={setExistingProjectDetailsFormData}
                    purpose={purpose}
                    setIsOffBoardSideBar={setIsOffBoardSideBar}
                    onSelectOffBoardingScope={handleSelectOffBoardingScope}
                    selectOffboadingScope={selectOffboadingScope}
                    token={token}
                  />
                ) : (
                  <ProjectDetails 
                    formData={formData}  
                    handleChange={handleChange} 
                    data={nonClientNewProjectData} 
                    onSaveDraft={handleSaveDraft} 
                  />
                )}
                <ActionButtons
                  onDiscard={handleBack}
                  onContinue={handleContinue}
                  onSaveDraft={isProjectDetailsModified() ? handleSaveDraft : undefined}
                  saveDraftLoading={saveDraftLoading}
                  disableSaveDraft={existingProject !== 'yes' && !formData?.projectCodeName}
                  isContinueDisabled={true}
                   isBackButtinShoewn={true}
                  disableContinue={existingProject === 'yes'
                    ? !existingProjectDetailsFormData?.selectedProjectKey
                    : !formData?.projectCodeName}
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
                      selectOffboadingScope={selectOffboadingScope}
                      selectedOffBoardngImpactTools={selectedOffBoardngImpactTools}
                      setSelectedOffBoardingImpactTools={setSelectedOffBoardingImpactTools}
                        existingProjectMetadata={existingProjectMetadata}
                          existingProjectDetailsFormData={existingProjectDetailsFormData}
                    />
                  ) : (
                    <ExistingToolConfiguration
                      data={nonClientNewProjectData}
                      existingProjectMetadata={existingProjectMetadata}
                      existingToolFormData={existingToolFormData}
                      setExistingToolFormData={setExistingToolFormData}
                      isDraftProject={isDraftProject}
                    />
                  )
                ) : (
                  <ToolConfiguration
                    formData={formData}
                    setFormData={setFormData}
                    handleChange={handleChange}
                    data={nonClientNewProjectData}
                  />
                )}
                <ActionButtons
                  onDiscard={handleDiscard}
                  onBackButton={handleBack}
                  onContinue={handleContinue}
                  onSaveDraft={(isProjectDetailsModified() || isToolConfigModified()) ? handleSaveDraft : undefined}
                  saveDraftLoading={saveDraftLoading}
                  disableSaveDraft={existingProject !== 'yes' && !formData?.projectCodeName}
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
                  <DataHandling
                    selectOffboadingScope={selectOffboadingScope}
                    dataHandlingtools={dataHandlingtools}
                    setDataHandlingTools={setDataHandlingTools}
                    toolsNameChecked={toolsNameChecked}
                    setToolNameChecked={setToolNameChecked}
                    existingProjectMetadata={existingProjectMetadata}
                  />
                ) : (
                  <AccessApproval
                    formData={formData}
                    setFormData={setFormData}
                    handleChange={handleChange}
                    existingProject={existingProject}
                    data={nonClientNewProjectData}
                    existingProjectMetadata={existingProjectMetadata}
                    existingToolFormData={existingToolFormData}
                    isDraftProject={isDraftProject}
                  />
                )}
                <ActionButtons
                  onDiscard={handleDiscard}
                  onBackButton={handleBack}
                  onContinue={handleContinue}
                  onSaveDraft={(isProjectDetailsModified() || isToolConfigModified() || isAccessApprovalModified()) ? handleSaveDraft : undefined}
                  saveDraftLoading={saveDraftLoading}
                  disableSaveDraft={existingProject !== 'yes' && !formData?.projectCodeName}
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
                  <OffBoardReview
                    selectOffboadingScope={selectOffboadingScope}
                    offBoardconfirmation={offBoardconfirmation}
                    setOffBoardConfirmation={setOffBoardConfirmation}
                    dataHandlingtools={dataHandlingtools}
                    existingProjectDetailsFormData={existingProjectDetailsFormData}
                    existingProjectMetadata={existingProjectMetadata}
                  />
                ) : (
                  <ReviewSubmit
                    onSubmit={handleContinue}
                    onDiscard={handleDiscard}
                    onBack={handleBack}
                    existingProject={existingProject}
                    formData={formData}
                    data={nonClientNewProjectData}
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
                  onSaveDraft={(isProjectDetailsModified() || isToolConfigModified() || isAccessApprovalModified()) ? handleSaveDraft : undefined}
                  saveDraftLoading={saveDraftLoading}
                  disableSaveDraft={existingProject !== 'yes' && !formData?.projectCodeName}
                  isBackButtinShoewn={true}
                  isSubmitDisabled={true}
                  handleOffBoardingFormSubmit={handleOffBoardingFormSubmit}
                  purpose={purpose}
                  // disableContinue={!formData.confirmation}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};
