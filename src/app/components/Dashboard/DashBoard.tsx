import { useState, useMemo } from 'react';
import { TabBar } from './TabBar';
import { KPISection } from './KPISection';
import { ApprovalTable } from './ApprovalTable';
import { mockApprovalRequests, getStatusCounts, getDetailedRequest } from './Data/mockData';
import { TabType } from './Types/index';
import DashBoardApproverPage from './DashBoardApproverPage';
import RequestDetail from './ApproverRequestDetails/RequestDetail';
import { DashBoardRecordItem, DashboardResponse, StepType } from '../Utils/UiUtilis';

interface DashBoardProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<StepType>>;
  setDashboardType: React.Dispatch<React.SetStateAction<string>>;
  setExistingProject: React.Dispatch<React.SetStateAction<string>>;
  setExistingProjectDetailsFormData: React.Dispatch<React.SetStateAction<any>>;
  dashboardDetails:DashboardResponse | null;
  accessToken:string
}
export default function DashBoard({
  setCurrentStep,
  setDashboardType,
  setExistingProject,
  setExistingProjectDetailsFormData,
  dashboardDetails,
  accessToken
}: DashBoardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('approver');
  const [isRequestDetailsClicked, setIsRequestDetailsClicked] = useState<boolean>(false);
  const [approvalID,setApprovalID] = useState("")
    const [selectedRecord, setSelectedRecord] = useState<DashBoardRecordItem | null>(null);
    console.log("selectedRecord",selectedRecord);
  const statusCounts = useMemo(() => getStatusCounts(mockApprovalRequests), []);

  const handleRequestDetailsView = (value: boolean,approvalID:string) => {
    setApprovalID(approvalID);
    setIsRequestDetailsClicked(value);
        // Safe lookup
    const record =
      dashboardDetails?.result?.all_records?.find((r: DashBoardRecordItem) => r.approvalID === approvalID) ?? null;

    setSelectedRecord(record);
  };
  
  const handleUpdateRequest = () => {
    setExistingProject('yes');
    setExistingProjectDetailsFormData((prev: any) => ({
      ...prev,
      searchValue: 'TR0001930', // static value need to update as dynamic
      selectedProjectKey: 'TR0001930', // static value need to update as dynamic
    }));
    setDashboardType('newrequest');
    setCurrentStep('project-details');
  };
  const handleAddToolButton = () => {
    setExistingProject('yes');
    setExistingProjectDetailsFormData((prev: any) => ({
      ...prev,
      searchValue: 'TR0001930', // static value need to update as dynamic
      selectedProjectKey: 'TR0001930', // static value need to update as dynamic
    }));
    setDashboardType('newrequest');
    setCurrentStep('tool-configuration');
    // access-approval
  };
  const handleAddUserButton = () => {
    setExistingProject('yes');
    setExistingProjectDetailsFormData((prev: any) => ({
      ...prev,
      searchValue: 'TR0001930', // static value need to update as dynamic
      selectedProjectKey: 'TR0001930', // static value need to update as dynamic
    }));
    setDashboardType('newrequest');
    setCurrentStep('access-approval');
  };
  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col" style={{ marginTop: '60px' }}>
      {!isRequestDetailsClicked && (
        <DashBoardApproverPage
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onRequestDetailsView={handleRequestDetailsView}
          dashboardDetails={dashboardDetails}
        />
      )}
      {isRequestDetailsClicked && (
        <RequestDetail
          activeTab={activeTab}
          onRequestDetailsView={handleRequestDetailsView}
          onUpdateRequest={handleUpdateRequest}
          onAddToolButton={handleAddToolButton}
          onAddUserButton={handleAddUserButton}
          dashboardDetails={dashboardDetails}
          approvalID={approvalID}
          selectedRecord={selectedRecord}
          accessToken={accessToken}
        />
      )}
    </div>
  );
}
