import React, { useEffect, useState } from 'react';
import { MainComponent } from './components/mainComponents';
import { fetchNonClientNewProject, generateToken, getDashboardDetails, initializeMsalClient } from './service/api';
import { DashboardResponse, ExistingProjectDetailsFormData, Loader, StepType } from './components/Utils/UiUtilis';
import DashBoard from './components/Dashboard/DashBoard';
import styles from '../app/App.module.css';
import { Header } from './components/Header/Header';

export default function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [nonClientNewProjectData, setNonClientNewProjectData] = useState<any>(null);
  const [dashBoardType, setDashboardType] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<StepType>('newclient-intro');
  const [existingProject, setExistingProject] = useState<string>('');
  const [existingProjectDetailsFormData, setExistingProjectDetailsFormData] =
    useState<ExistingProjectDetailsFormData>({
      searchValue: '',
      selectedProjectKey: '',
      existingProject: null,
    });

  // NEW: state to hold dashboard details
  const [dashboardDetails, setDashboardDetails] = useState<DashboardResponse|null>(null);
  const handleVavigateDashBoard = (dashBoardType: string) => {
    setDashboardType(dashBoardType);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const initializeApp = async (): Promise<void> => {
      try {
        await initializeMsalClient();

        const token: string | null = await generateToken();
        if (!token) return;

        setAccessToken(token);

        const projectInfo = await fetchNonClientNewProject(token);
        setNonClientNewProjectData(projectInfo);
        console.log('Non-client project info:', projectInfo);
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();
  }, []);

  // NEW: fetch dashboard details once accessToken is ready
  useEffect(() => {
    const fetchDashboard = async () => {
      if (!accessToken) return;
      try {
        const details = await getDashboardDetails('Jake White', accessToken); 
        setDashboardDetails(details);
      } catch (error) {
        console.error('Error fetching dashboard details:', error);
      }
    };

    fetchDashboard();
  }, [accessToken]);

  if (!accessToken) {
    return <Loader />;
  }

  return (
    <div className={styles.app}>
      <Header
        onMenuToggle={toggleSidebar}
        onNavigateDashBoard={handleVavigateDashBoard}
        dashBoardType={dashBoardType}
      />

      {dashBoardType === 'newrequest' && (
        <MainComponent
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          nonClientNewProjectData={nonClientNewProjectData}
          token={accessToken}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          existingProject={existingProject}
          setExistingProject={setExistingProject}
          existingProjectDetailsFormData={existingProjectDetailsFormData}
          setExistingProjectDetailsFormData={setExistingProjectDetailsFormData}
        />
      )}

      {dashBoardType === 'dashboard' && (
        <DashBoard
          setCurrentStep={setCurrentStep}
          setDashboardType={setDashboardType}
          setExistingProject={setExistingProject}
          setExistingProjectDetailsFormData={setExistingProjectDetailsFormData}
          // pass dashboardDetails down if DashBoard needs it
          dashboardDetails={dashboardDetails}
          accessToken={accessToken}
        />
      )}
    </div>
  );
}