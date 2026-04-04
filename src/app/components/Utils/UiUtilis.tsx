// Maps ETRFDetails and DataDetails form fields to the ETRF API payload structure
export const mapEtrfFormDataToApiPayload = (etrfDetails: any, dataDetails: any) => {
  // Helper to safely get value or fallback
  const get = (obj: any, key: string, fallback: any = '') => (obj && obj[key] !== undefined ? obj[key] : fallback);

  // Map all payload fields to UI fields from ETRFDetails and DataDetails
  return {
    project_id: get(etrfDetails, 'sapProjectId'),
    technology_request_type: 'engagement',
    codename: get(etrfDetails, 'projectCodeName'),
    client_name: get(etrfDetails, 'clientName'),
    type_of_work: get(etrfDetails, 'typeOfWork'),
    country: get(dataDetails, 'dataCountryOrigin'),
    estimated_start_date: get(etrfDetails, 'estimatedStartDate'),
    estimated_end_date: get(etrfDetails, 'estimatedEndDate'),
    short_description: get(etrfDetails, 'description'),
    datasize: get(dataDetails, 'dataVolume'),
    country_of_origin: get(dataDetails, 'dataCountryOrigin'),
    client_allow_data: get(dataDetails, 'dataTransferAbroad'),
    itar: get(dataDetails, 'privacyRequirements')?.tar ? 'yes' : 'no',
    soc_2: get(dataDetails, 'privacyRequirements')?.soc2 ? 'yes' : 'no',
    gdpr: get(dataDetails, 'privacyRequirements')?.gdpr ? 'yes' : 'no',
    sox: get(dataDetails, 'privacyRequirements')?.sox ? 'yes' : 'no',
    iso27001: get(dataDetails, 'privacyRequirements')?.iso27001 ? 'yes' : 'no',
    ear: get(dataDetails, 'privacyRequirements')?.ear ? 'yes' : 'no',
    ccpa_2018: get(dataDetails, 'privacyRequirements')?.ccpa2018 ? 'yes' : 'no',
    other_client_specific: get(dataDetails, 'privacyRequirements')?.other ? 'yes' : 'no',
    personal_data_2021: get(dataDetails, 'dataTypes')?.personalData ? 'yes' : 'no',
    npi_data_2021: get(dataDetails, 'dataTypes')?.npi ? 'yes' : 'no',
    pci_dss_data_2021: get(dataDetails, 'dataTypes')?.pci ? 'yes' : 'no',
    phi_data_2021: get(dataDetails, 'dataTypes')?.phi ? 'yes' : 'no',
    ip_data_2021: get(dataDetails, 'dataTypes')?.sensitiveData ? 'yes' : 'no',
    request_status: 'Onboarding - Requested',
    state: '1',
    are_you_planning_to_use_any_personal_or_protected_data: get(dataDetails, 'dataTypes')?.personalData ? 'yes' : 'no',
    opened_by: get(etrfDetails, 'openedBy', 'Vismit Ambre'),
    custom: get(etrfDetails, 'custom', 'Application Development'),
    managing_director: get(etrfDetails, 'managingDirector', 'Jake White'),
    secondary_managing_director: get(etrfDetails, 'secondaryManagingDirector', 'Asmaa Taha'),
    md: get(etrfDetails, 'md', 'Nikhitaa Sanjay'),
    delegated_information_owner: get(etrfDetails, 'delegatedInformationOwner', 'Luca Ramella'),
    project_manager: get(etrfDetails, 'projectManager', 'Derek Roberson'),
    approvers: get(etrfDetails, 'approvers', ['Raghavendra Kantharaju', 'Sandeep Chollangi']),
    namevalue: get(etrfDetails, 'namevalue', [{ 'Souradyuti Shome': ['Team Site'] }]),
    user_role: get(etrfDetails, 'userRole', 'Developer'),
    memo_to_md: get(etrfDetails, 'memoToMd', ''),
  };
};
const getOrdinal = (n: number): string => {
  const v = n % 100;
  if (v >= 11 && v <= 13) return 'th';
  switch (n % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const formatDate = (isoDate: string): string => {
  if (!isoDate) return '';
  const d = new Date(isoDate + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return '';
  const month = d.toLocaleString('default', { month: 'long' });
  const day = d.getDate();
  const year = d.getFullYear();
  const ordinal = getOrdinal(day);
  return `${month} ${day}${ordinal}, ${year}`;
};

export const calculateProgress = (formData: any, purpose: string): number => {
  const onboardingFields: string[] = [
    'sapProjectId',
    'projectCodeName',
    'projectType',
    'estimatedStartDate',
    'estimatedEndDate',
    'description',
    'selectedTools',
    'customToolRequest',
    'primaryPmdPartner',
    'secondoryPmdPartner',
    'informationOwner',
    'delegateIformationOwner',
    'projectManaeger',
    'approvers',
    'confirmation',
  ];

  const offboardingFields: string[] = [
    'exitReason',
    'handoverDetails',
    'lastWorkingDay',
    'knowledgeTransferCompleted',
    'approvers',
    'confirmation',
  ];

  const allFields = purpose === 'offboarding' ? offboardingFields : onboardingFields;

  const filledFields = allFields.filter(
    (field) => formData[field] !== undefined && formData[field] !== null && formData[field] !== ''
  );

  return Math.round((filledFields.length / allFields.length) * 100);
};

export const findNameByEmail = (email: string, userList: any[]) => {
  if (!email) return '';
  const e = email.trim();
  const user = userList.find((u: any) => (u.emailID || '').toLowerCase() === e.toLowerCase());
  return user?.name || email;
};

export const mapFormDataToApiPayload = (formData: any) => {
  const normalizeToolsArray = (input: any): string[] => {
    let value = input;
    for (let i = 0; i < 3; i += 1) {
      if (typeof value === 'string') {
        const trimmed = value.trim();
        if (
          (trimmed.startsWith('[') && trimmed.endsWith(']')) ||
          (trimmed.startsWith('"') && trimmed.endsWith('"'))
        ) {
          try {
            value = JSON.parse(trimmed);
            continue;
          } catch {
            break;
          }
        }
      }
      break;
    }

    const arrayValue = Array.isArray(value) ? value.flat(Infinity) : [value];
    return arrayValue.map((item) => (item == null ? '' : String(item).trim())).filter(Boolean);
  };

  const normalizeNameValuePairs = (pairs: any[]): any[] => {
    if (!Array.isArray(pairs)) return [];
    return pairs
      .map((pair) => {
        const [name, tools] = Object.entries(pair || {})[0] ?? [];
        if (!name) return null;
        return { [name]: normalizeToolsArray(tools) };
      })
      .filter(Boolean) as any[];
  };

  return {
    number: formData.ertmProjectId,
    non_client_project: 'non_client_project',
    project_id: formData.sapProjectId,
    codename: formData.projectCodeName,
    what_type_of_project: formData.projectType,
    estimated_start_date: formatDate(formData.estimatedStartDate),
    estimated_end_date: formatDate(formData.estimatedEndDate),
    collecting_personal_data: formData.personalOrprotectedData,
    short_description: formData.description,
    opened_by: 'Navneet Agarwal',
    tools: formData?.selectedTools?.map((tool: any) => ({
      tool_id: tool.ToolId ?? tool.toolId ?? tool.id,
      trust_external_domain: tool.trustExternalDomain || '',
      external_domain_name: tool.externalDomainName || '',
    })) || [],
    questionsinput: Array.isArray(formData.questionsinput) ? formData.questionsinput : [],
    custom: formData.customToolRequest,
    managing_director: formData.primaryPmdPartner,
    secondary_managing_director: formData.secondoryPmdPartner,
    md: formData.informationOwner,
    delegated_information_owner: formData.delegateIformationOwner,
    project_manager: formData.projectManager,
    approvers: Array.isArray(formData.approvers) ? formData.approvers : [formData.approvers],
    namevalue: normalizeNameValuePairs(formData.nameValuePairs),
    memo_to_approving_md: formData.memoToApprovainMd,
    confirmation: formData.confirmation ? 'Yes' : 'No',
    state: formData.state ?? 1,
    technology_request_type: 'Internal',
    request_status: formData.state === 0 ? null : 'Onboarding - Requested',
  };
};

export type DataHandlingSelection = { id: string; name: string; action: string; checked: boolean };
export type OffboardFormData = {
  ertmProjectId: string;
  offboardingScope: string;
  selectedTools: string[];
  datHanldingSelction: DataHandlingSelection[];
  isAuthorized: boolean;
  isIunderstand: boolean;
  isIacknowledge: boolean;
};

export type OffboardingImpactTool = {
  name: string;
  platform: string;
};

export type DataHandlingTool = {
  id: string;
  name: string;
  action: string; // will hold "Archive", "Delete", "Transfer", etc.
  checked: boolean;
};

export type OffBoardConfirmationState = {
  isAuthorized: boolean;
  isIunderstand: boolean;
  isIacknowledge: boolean;
};

export type OffBoardFormData = {
  sapProjectId: string;
  selectOffboadingScope: string;
  selectedOption: string;
  selectedOffBoardngImpactTools: string[];
  toolsNameChecked: boolean;
  dataHandlingtools: DataHandlingTool[];
  offBoardconfirmation: OffBoardConfirmationState;
};

export type StepType =
  | 'newclient-intro'
  | 'project-details'
  | 'tool-configuration'
  | 'access-approval'
  | 'review-submit'
  | 'submission-success'
  | '';

export type ExistingProjectDetailsFormData = {
  searchValue: string;
  selectedProjectKey: string;
  existingProject: string | null; // adjust type if needed
};

export const Loader: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
    }}
  >
    {' '}
    <div
      className="spinner"
      style={{
        border: '6px solid #f3f3f3',
        borderTop: '6px solid #3498db',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite',
      }}
    />{' '}
    <p style={{ marginTop: '16px', fontSize: '18px', color: '#333' }}>Loading, please wait...</p>{' '}
    {/* Inline CSS animation */}{' '}
    <style>
      {' '}
      {` @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } `}{' '}
    </style>{' '}
  </div>
);


// src/types/dashboard.ts

export interface NameValue {
  name: string;
  value: string;
    id?: string;
  isExpanded?: boolean;
}

export interface DashBoardRecordItem {
  approvalID: string;
  technology_request_id: string;
  project_code: string;
  client_name: string;
  type_of_work: string;
  ironclad_id: string;
  radius_id: string;
  sap_project_id: string;
  requestor: string;
  submitted_date: string;
  state: string;
  request_status: string;
  approval_state: string;
  managing_director: string;
  secondary_managing_director: string;
  information_owner: string;
  delegated_information_owner: string;
  project_manager: string;
  approvers: string;
  namevalue: NameValue[];
}

export interface Summary {
  pending: number;
  approved: number;
  rejected: number;
}

export interface DashboardResult {
  summary: Summary;
  all_records: DashBoardRecordItem[];
}

export interface DashboardResponse {
  result: DashboardResult;
}


export interface ApprovalUpdatePayload {
  state: string;
  comment?: string;
}