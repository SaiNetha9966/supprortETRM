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
  accessToken:string;
  activeTab:TabType;
  setActiveTab:React.Dispatch<React.SetStateAction<TabType>>;
  requestorDashboardDetails:any;
  onCreateNewButtons:(option:string)=> void;
}
export default function DashBoard({
  setCurrentStep,
  setDashboardType,
  setExistingProject,
  setExistingProjectDetailsFormData,
  dashboardDetails,
  accessToken,
  activeTab,
  setActiveTab,requestorDashboardDetails,onCreateNewButtons
}: DashBoardProps) {
  // const [activeTab, setActiveTab] = useState<TabType>('approver');
  const [isRequestDetailsClicked, setIsRequestDetailsClicked] = useState<boolean>(false);
  const [approvalID,setApprovalID] = useState("")
    const [selectedRecord, setSelectedRecord] = useState<DashBoardRecordItem | null>(null);
    console.log("selectedRecord",selectedRecord);
  const statusCounts = useMemo(() => getStatusCounts(mockApprovalRequests), []);

  // const handleRequestDetailsView = (value: boolean,approvalID:string) => {
  //   setApprovalID(approvalID);
  //   setIsRequestDetailsClicked(value);
  //   const record =
  //     dashboardDetails?.result?.all_records?.find((r: DashBoardRecordItem) => r.approvalID === approvalID) ?? null;

  //   setSelectedRecord(record);
  // };
const handleRequestDetailsView = (value: boolean, approvalID: string) => {
  setApprovalID(approvalID);
  setIsRequestDetailsClicked(value);
  const records =
    activeTab === "requestor"
      ? requestorDashboardDetails?.result?.all_records ?? []
      : activeTab === "approver"
      ? dashboardDetails?.result?.all_records ?? []
      : dashboardDetails?.result?.all_records ?? [];

  let record: DashBoardRecordItem | null = null;
  try {
    if (activeTab === "approver") {
      record =
        records.find((r: DashBoardRecordItem) => r.approvalID === approvalID) ??
        null;
    } else if (activeTab === "requestor") {
      record =
        records.find(
          (r: DashBoardRecordItem) =>
            r.technology_request_id === approvalID 
        ) ?? null;
    }
  } catch (error) {
    console.error("Error finding record:", error);
  }

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
          requestorDashboardDetails={requestorDashboardDetails}
          onCreateNewButtons={onCreateNewButtons}
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
          requestorDashboardDetails={requestorDashboardDetails}
        />
      )}
    </div>
  );
}
