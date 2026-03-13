export interface ApprovalRequest {
  id: string;
  projectCodeName: string;
  clientName: string;
  typeOfWork: string;
  ironcladId: string;
  radiusId: string;
  sapProjectId: string;
  requestor: string;
  submittedDate: string;
  requestStatus: RequestStatus;
}

export type RequestStatus =
  | 'Onboarding - Awaiting Response'
  | 'Onboarding - Pending Approval'
  | 'Offboarding - Pending Approval'
  | 'Onboarding - In Progress'
  | 'Onboarding - Approved';

export type TabType = 'requestor' | 'approver';

export type FilterStatus = 'all' | RequestStatus;