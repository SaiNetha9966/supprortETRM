import React, { useEffect, useState } from 'react';
import { MainComponent } from './components/mainComponents';
import { fetchNonClientNewProject, generateToken, initializeMsalClient } from './service/api';
import { Loader } from './components/Utils/UiUtilis';
import DashBoard from './components/Dashboard/DashBoard';
// import styles from '/../app/App.module.css';
import styles from '../app/App.module.css';
import { Header } from './components/Header/Header';

export default function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [nonClientNewProjectData, setNonClientNewProjectData] = useState<any>(null);
  const [dashBoardType, setDashboardType] = useState<string>('newrequest');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleVavigateDashBoard = (dashBoardType: string) => {
    setDashboardType(dashBoardType);
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  // useEffect(() => {
  //   const initializeApp = async (): Promise<void> => {
  //     try {
  //       await initializeMsalClient();

  //       const token: string | null = await generateToken();
  //       if (!token) return;

  //       setAccessToken(token);
  //       const projectInfo = await fetchNonClientNewProject(token);
  //       setNonClientNewProjectData(projectInfo);
  //       console.log(projectInfo);
  //     } catch (error) {
  //       console.error('Error initializing app:', error);
  //     }
  //   };

  //   initializeApp();
  // }, []);

  // Show loader until token is ready
  // if (!accessToken) {
  //   return <Loader />;
  // }

  return (
    <div className={styles.app}>
      <Header
        onMenuToggle={toggleSidebar}
        onNavigateDashBoard={handleVavigateDashBoard}
        dashBoardType={dashBoardType}
      />

      {dashBoardType === 'newrequest' && (
        <>
          <MainComponent
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            nonClientNewProjectData={nonClientNewProjectData}
            token={accessToken}
          />
        </>
      )}
      {dashBoardType === 'dashboard' && <DashBoard />}
    </div>
  );
}
