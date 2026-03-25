import { useState, useMemo } from 'react';
import { TabBar } from './TabBar';
import { KPISection } from './KPISection';
import { ApprovalTable } from './ApprovalTable';
import { mockApprovalRequests, getStatusCounts } from './Data/mockData';
import { TabType } from './Types/index';
import DashBoardApproverPage from './DashBoardApproverPage';
import RequestDetail from './ApproverRequestDetails/RequestDetail';
import { StepType } from '../Utils/UiUtilis';

interface DashBoardProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<StepType>>;
  setDashboardType: React.Dispatch<React.SetStateAction<string>>;
  setExistingProject: React.Dispatch<React.SetStateAction<string>>;
  setExistingProjectDetailsFormData: React.Dispatch<React.SetStateAction<any>>;
}
export default function DashBoard({
  setCurrentStep,
  setDashboardType,
  setExistingProject,
  setExistingProjectDetailsFormData,
}: DashBoardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('approver');
  const [isRequestDetailsClicked, setIsRequestDetailsClicked] = useState<boolean>(false);
  const statusCounts = useMemo(() => getStatusCounts(mockApprovalRequests), []);

  const handleRequestDetailsView = (value: boolean) => {
    setIsRequestDetailsClicked(value);
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
        />
      )}
      {isRequestDetailsClicked && (
        <RequestDetail
          activeTab={activeTab}
          onRequestDetailsView={handleRequestDetailsView}
          onUpdateRequest={handleUpdateRequest}
          onAddToolButton={handleAddToolButton}
          onAddUserButton={handleAddUserButton}
        />
      )}
    </div>
  );
}
