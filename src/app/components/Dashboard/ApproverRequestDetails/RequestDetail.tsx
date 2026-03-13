import { useEffect, useState } from 'react';
import { getDetailedRequest, DetailedRequest } from '../Data/mockData';
import { RequestDetailHeader } from './RequestDetailHeader';
import { ETRFDetailsSection } from './ETRFDetailsSection';
import {ApproversSection} from "./ApproversSection";
import { RequestedToolsSection } from './RequestedToolsSection';
import { RequestedUsersSection } from './RequestedUsersSection';
// import { ETRFDetailsSection } from '../components/RequestDetail/ETRFDetailsSection';
// import { ApproversSection } from '../components/RequestDetail/ApproversSection';
// import { RequestedToolsSection } from '../components/RequestDetail/RequestedToolsSection';
// import { RequestedUsersSection } from '../components/RequestDetail/RequestedUsersSection';

export default function RequestDetail() {
  const [request, setRequest] = useState<DetailedRequest | null>(null);
 useEffect(() =>{
   const data = getDetailedRequest("1");
    setRequest(data);
 },[])

  if (!request) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-[#727272] font-['Roboto',sans-serif]">Loading...</div>
      </div>
    );
  }

  return (
    <main className="flex-1 w-full relative">
      <RequestDetailHeader request={request} />
      <div className="px-4 sm:px-6 lg:px-20 py-6 space-y-6 max-w-[1440px] mx-auto pb-20">
        <ETRFDetailsSection request={request} />
        <ApproversSection request={request} />
         <RequestedToolsSection request={request} />
         <RequestedUsersSection request={request} />
      </div>
    </main>
  );
}
