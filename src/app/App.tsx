import React, { useEffect, useState } from 'react';
import {MainComponent} from './components/mainComponents';
import { fetchNonClientNewProject, generateToken, initializeMsalClient } from './service/api';
import { Loader } from './components/Utils/UiUtilis';


export default function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [nonClientNewProjectData, setNonClientNewProjectData] = useState<any>(null);

  useEffect(() => {
    const initializeApp = async (): Promise<void> => {
      try {
        await initializeMsalClient();

        const token: string | null = await generateToken();
        if (!token) return;

        setAccessToken(token);

        console.log('token', token);

        const projectInfo = await fetchNonClientNewProject(token);
        setNonClientNewProjectData(projectInfo);
        console.log(projectInfo);
      } catch (error) {
        console.error("Error initializing app:", error);
      }
    };

    initializeApp();
  }, []);

  // Show loader until token is ready
  if (!accessToken) {
    return <Loader />;
  }

  return (
    <>
      <MainComponent nonClientNewProjectData={nonClientNewProjectData} />
    </>
  );
}
