import { TabBar } from './TabBar';
import { KPISection } from './KPISection';
import { ApprovalTable } from './ApprovalTable';
import { mockApprovalRequests } from './Data/mockData';
import { TabType } from './Types/index';
import { DashboardResponse } from '../Utils/UiUtilis';

interface DashBoardApproverPageProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onRequestDetailsView: (value: boolean , approvalID:string) => void;
  dashboardDetails: DashboardResponse;
  requestorDashboardDetails:any;
  onCreateNewButtons:(option :string) => void;
}

export default function DashBoardApproverPage({
  activeTab,
  setActiveTab,
  onRequestDetailsView,
  dashboardDetails,requestorDashboardDetails,onCreateNewButtons
}: DashBoardApproverPageProps) {
  // Safely extract summary values with defaults
  const summary = dashboardDetails?.result?.summary ?? {};
  const {
    approved = 0,
    pending = 0,
    rejected = 0,
    // awaitingResponse = 0
  } = summary;


const requestorSummary = requestorDashboardDetails?.result?.summary ?? null;

  return (
    <main className="w-full px-4 sm:px-6 lg:px-4 py-6 space-y-6 max-w-[1440px] mx-auto">
      <TabBar activeTab={activeTab} onTabChange={setActiveTab}onCreateNewButtons={onCreateNewButtons}  />
      
      {
        activeTab === 'requestor'&& (
        <KPISection
        draft={requestorSummary?.draft}
       pendingApproval={requestorSummary?.pending}
        awaitingResponse = {0} // need to update not getting response from API
        approved={requestorSummary?.complete}
        rejected={requestorSummary?.canceled}
        activeTab={activeTab}
      />
        )
      }
      {
        activeTab === 'approver' && (
      <KPISection
        pendingApproval={pending}
        awaitingResponse = {0} // need to update not getting response from API
        approved={approved}
        rejected={rejected}
        activeTab={activeTab}
      />
        )
      }

      <ApprovalTable
        requests={dashboardDetails?.result?.all_records}
        onRequestDetailsView={onRequestDetailsView}
        dashBoardactiveTab={activeTab}
       requestorDashboardDetails = {requestorDashboardDetails?.result?.all_records}
      />
    </main>
  );
}
