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
  setRequestType:React.Dispatch<React.SetStateAction<'ETRF' | 'ITRF'>>;
  setIronclacId:React.Dispatch<React.SetStateAction<string>>;
  setClientExistingProject:React.Dispatch<React.SetStateAction<string>>;
}
export default function DashBoard({
  setCurrentStep,
  setDashboardType,
  setExistingProject,
  setExistingProjectDetailsFormData,
  dashboardDetails,
  accessToken,
  activeTab,
  setActiveTab,requestorDashboardDetails,onCreateNewButtons,
  setRequestType,setIronclacId,setClientExistingProject
}: DashBoardProps) {
  // const [activeTab, setActiveTab] = useState<TabType>('approver');
  const [isRequestDetailsClicked, setIsRequestDetailsClicked] = useState<boolean>(false);
  const [approvalID,setApprovalID] = useState("")
  const [selectedRecord, setSelectedRecord] = useState<DashBoardRecordItem | null>(null);
  const [selectedRecordType, setSelectedRecordType] = useState<'ALL' | 'ETRF' | 'ITRF' | null>(null);
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

    const requestorAllRecords = requestorDashboardDetails?.result?.all_records ?? [];
    const requestorEtrfRecords = requestorDashboardDetails?.result?.etrf_records ?? [];
    const requestorItrfRecords = requestorDashboardDetails?.result?.itrf_records ?? [];

    const approverAllRecords = dashboardDetails?.result?.all_records ?? [];
    const approverEtrfRecords = dashboardDetails?.result?.etrf_records ?? [];
    const approverItrfRecords = dashboardDetails?.result?.itrf_records ?? [];

    const allRecords = activeTab === 'requestor' ? requestorAllRecords : approverAllRecords;
    const etrfRecords = activeTab === 'requestor' ? requestorEtrfRecords : approverEtrfRecords;
    const itrfRecords = activeTab === 'requestor' ? requestorItrfRecords : approverItrfRecords;

    const matchesId = (record: DashBoardRecordItem) =>
      record.approvalID === approvalID || record.technology_request_id === approvalID;

    let record: DashBoardRecordItem | null = null;
    let recordType: 'ALL' | 'ETRF' | 'ITRF' | null = null;

    try {
      const foundEtrf = etrfRecords.find(matchesId) ?? null;
      const foundItrf = itrfRecords.find(matchesId) ?? null;
      const foundAll = allRecords.find(matchesId) ?? null;

      record = foundEtrf ?? foundItrf ?? foundAll;
      recordType = foundEtrf ? 'ETRF' : foundItrf ? 'ITRF' : foundAll ? 'ALL' : null;
    } catch (error) {
      console.error('Error finding record:', error);
    }

    setSelectedRecord(record);
    setSelectedRecordType(recordType);
  };

  const handleUpdateRequest = (ironClacId: string , approverId:string) => {
    console.log("selectedRecordType", selectedRecordType);
    if (selectedRecordType === 'ETRF') {
          // setExistingProject('yes');
    setRequestType(selectedRecordType);
    setIronclacId(ironClacId ?? 'TR0001930');
    setClientExistingProject('no');
    // setExistingProjectDetailsFormData((prev: any) => ({
    //   ...prev,
    //   searchValue: 'TR0001930', // static value need to update as dynamic
    //   selectedProjectKey: 'TR0001930', // static value need to update as dynamic
    // }));
    setDashboardType('newrequest');
    setCurrentStep('newclient-intro');
    }
    else if (selectedRecordType === 'ITRF') {
                // setExistingProject('yes');
    setRequestType(selectedRecordType);
     setIronclacId(ironClacId ?? 'TR0001930');
     setClientExistingProject('no');
    // setExistingProjectDetailsFormData((prev: any) => ({
    //   ...prev,
    //   searchValue: 'TR0001930', // static value need to update as dynamic
    //   selectedProjectKey: 'TR0001930', // static value need to update as dynamic
    // }));
    setDashboardType('newrequest');
    setCurrentStep('newclient-intro');
    }
    else{
        setExistingProject('yes');
    // setRequestType(selectedRecordType);
    setExistingProjectDetailsFormData((prev: any) => ({
      ...prev,
      searchValue: approverId ?? 'TR0001930', // static value need to update as dynamic
      selectedProjectKey: approverId ?? 'TR0001930', // static value need to update as dynamic
    }));
    setDashboardType('newrequest');
    setCurrentStep('project-details');
    }
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
