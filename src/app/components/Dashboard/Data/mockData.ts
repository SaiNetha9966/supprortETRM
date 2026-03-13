import { ApprovalRequest } from '../types';

export const mockApprovalRequests: ApprovalRequest[] = [
  {
    id: '1',
    projectCodeName: 'Dahlia',
    clientName: 'Global Technology Partners',
    typeOfWork: 'Development',
    ironcladId: 'IC-42334',
    radiusId: 'R-0004',
    sapProjectId: 'SAP-004',
    requestor: 'Mark T.',
    submittedDate: '01/02/2026',
    requestStatus: 'Onboarding - Awaiting Response',
  },
  {
    id: '2',
    projectCodeName: 'Chrysanthemum',
    clientName: 'Pacific Data Systems',
    typeOfWork: 'Performance Improvement',
    ironcladId: 'IC-45879',
    radiusId: 'R-0012',
    sapProjectId: 'SAP-012',
    requestor: 'Mark C.',
    submittedDate: '07/02/2026',
    requestStatus: 'Onboarding - Pending Approval',
  },
  {
    id: '3',
    projectCodeName: 'Peony',
    clientName: '-',
    typeOfWork: 'Development',
    ironcladId: '-',
    radiusId: '-',
    sapProjectId: 'SAP-005',
    requestor: 'Amanda R.',
    submittedDate: '06/02/2026',
    requestStatus: 'Onboarding - Pending Approval',
  },
  {
    id: '4',
    projectCodeName: 'Orchid',
    clientName: 'Apex Solutions Group',
    typeOfWork: 'Performance Improvement',
    ironcladId: 'IC-49744',
    radiusId: 'R-0003',
    sapProjectId: 'SAP-003',
    requestor: 'Tom B.',
    submittedDate: '05/02/2026',
    requestStatus: 'Offboarding - Pending Approval',
  },
  {
    id: '5',
    projectCodeName: 'Jasmine',
    clientName: '-',
    typeOfWork: 'Development',
    ironcladId: '-',
    radiusId: '-',
    sapProjectId: 'SAP-002',
    requestor: 'James D.',
    submittedDate: '04/02/2026',
    requestStatus: 'Onboarding - In Progress',
  },
  {
    id: '6',
    projectCodeName: 'Lotus',
    clientName: 'Nexus Corporation',
    typeOfWork: 'Development',
    ironcladId: 'IC-48454',
    radiusId: 'R-0001',
    sapProjectId: 'SAP-001',
    requestor: 'David M.',
    submittedDate: '03/12/2026',
    requestStatus: 'Onboarding - Approved',
  },
  {
    id: '7',
    projectCodeName: 'Lavender',
    clientName: 'Meridian Health Systems',
    typeOfWork: 'Performance Improvement',
    ironcladId: 'IC-44544',
    radiusId: 'R-0008',
    sapProjectId: 'SAP-008',
    requestor: 'Sandra L.',
    submittedDate: '12/02/2026',
    requestStatus: 'Onboarding - Approved',
  },
];

export const getStatusCounts = (requests: ApprovalRequest[]) => {
  return {
    pendingApproval: requests.filter((r) =>
      r.requestStatus.includes('Pending Approval')
    ).length,
    awaitingResponse: requests.filter((r) =>
      r.requestStatus.includes('Awaiting Response')
    ).length,
    approved: requests.filter((r) => r.requestStatus.includes('Approved'))
      .length,
    rejected: 0, // No rejected items in current data
  };
};
