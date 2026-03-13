import { useState, useMemo } from 'react';
 import { TabBar } from './TabBar';
 import { KPISection } from './KPISection';
 import { ApprovalTable } from './ApprovalTable';
import { mockApprovalRequests, getStatusCounts } from './Data/mockData';
import { TabType } from './Types/index';

interface DashBoardApproverPageProps {
      activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function DashBoardApproverPage({activeTab,setActiveTab} : DashBoardApproverPageProps ) {
  const statusCounts = useMemo(
    () => getStatusCounts(mockApprovalRequests),
    []
  );

  return (
     <main className="w-full px-4 sm:px-6 lg:px-4 py-6 space-y-6 max-w-[1440px] mx-auto">
         <TabBar activeTab={activeTab} onTabChange={setActiveTab} /> 
         <KPISection
          pendingApproval={statusCounts.pendingApproval}
          awaitingResponse={statusCounts.awaitingResponse}
          approved={statusCounts.approved}
          rejected={statusCounts.rejected}
        /> 
         <ApprovalTable requests={mockApprovalRequests} />
      </main>
  );
}
