import React, { useEffect, useState } from 'react';
import MainComponent from './components/mainComponents';

type StepType = 'newclient-intro' | 'project-details' | 'tool-configuration' | 'access-approval' | 'review-submit' | 'submission-success';

export default function App() {
 

  return (
    <>
     <MainComponent/>
    </>

  );
}