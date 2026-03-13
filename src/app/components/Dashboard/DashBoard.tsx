import { useState, useMemo } from 'react';
 import { TabBar } from './TabBar';
 import { KPISection } from './KPISection';
 import { ApprovalTable } from './ApprovalTable';
import { mockApprovalRequests, getStatusCounts } from './Data/mockData';
import { TabType } from './Types/index';
import DashBoardApproverPage from './DashBoardApproverPage';
import RequestDetail from './ApproverRequestDetails/RequestDetail';

export default function DashBoard() {
      const [activeTab, setActiveTab] = useState<TabType>('approver');

  // Calculate KPI counts
  const statusCounts = useMemo(
    () => getStatusCounts(mockApprovalRequests),
    []
  );

  return (
     <div className="min-h-screen bg-[#f7f7f7] flex flex-col"  style={{marginTop:"60px"}}>
      {/* <DashBoardApproverPage activeTab={activeTab} setActiveTab = {setActiveTab}/> */}
      <RequestDetail/>
    </div>
  );
}
