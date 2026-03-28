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
}

export default function DashBoardApproverPage({
  activeTab,
  setActiveTab,
  onRequestDetailsView,
  dashboardDetails
}: DashBoardApproverPageProps) {
  // Safely extract summary values with defaults
  const summary = dashboardDetails?.result?.summary ?? {};
  const {
    approved = 0,
    pending = 0,
    rejected = 0,
    // awaitingResponse = 0
  } = summary;

  return (
    <main className="w-full px-4 sm:px-6 lg:px-4 py-6 space-y-6 max-w-[1440px] mx-auto">
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <KPISection
        pendingApproval={pending}
        awaitingResponse = {0} // need to update not getting response from API
        approved={approved}
        rejected={rejected}
        activeTab={activeTab}
      />

      <ApprovalTable
        requests={dashboardDetails?.result?.all_records}
        onRequestDetailsView={onRequestDetailsView}
        dashBoardactiveTab={activeTab}
      />
    </main>
  );
}
