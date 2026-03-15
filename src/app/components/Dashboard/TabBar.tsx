import RequestFormCard from './ApproverRequestDetails/RequestFormCard';
import { TabType } from './Types/index';

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
     <div className="bg-white rounded-lg p-6 w-full max-w-full">
      <div style={{display:"flex"}}>

              <div>
              <div style={{display:"flex"}}>
        <h2 className="font-['Roboto',sans-serif] font-bold text-[19px] text-[#4a4a4a] mb-4">
        TRM Approvals
      </h2>

      <div className="flex gap-2 mb-4">
        <button
        style={{cursor:"pointer"}}
          onClick={() => onTabChange('requestor')}
          className={`px-3 py-1 rounded-lg text-sm font-['Roboto',sans-serif] transition-colors ${
            activeTab === 'requestor'
              ?  'bg-white text-[#3f7b25] font-medium'
              :   'bg-[#f7f7f7] text-[#727272] font-normal'
          }`}
        >
          Requestor
        </button>
        <button
        style={{cursor:"pointer"}}
          onClick={() => onTabChange('approver')}
          className={`px-3 py-1 rounded-lg text-sm font-['Roboto',sans-serif] transition-colors ${
            activeTab === 'approver'
              ?  'bg-white text-[#3f7b25] font-medium'
              : 'bg-[#f7f7f7] text-[#727272] font-normal' 
          }`}
        >
          Approver
        </button>
      </div>

      </div>
      <div className="space-y-2">
        <p className="font-['Roboto',sans-serif] text-sm text-[#4a4a4a]">
          Welcome to the Technology Request Management Portal.
        </p>
        <p className="font-['Roboto',sans-serif] text-sm text-[#4a4a4a]">
          You may choose whether you want to view requests you've submitted or
          requests you approve.
        </p>
      </div>
      <div  style={{display:"flex" , gap:"24px" , marginTop:"40px"}}>
              <RequestFormCard
        title="Engagement Technology Request Form (ETRF)"
        description="This form should be used for all client projects requiring technology or internal projects requiring specialized tools maintained in client technology environments."
        buttonText="+ Create New ETRF"
        onClick={() => alert("ETRF form creation")}
      />
      <RequestFormCard
        title="Internal Technology Request Form (ITRF)"
        description="This form should be used when work is internal, experimental or product focused and does not and will not contain client data."
        buttonText="+ Create New ITRF"
        onClick={() => alert("ITRF form creation")}
      />
      </div>
      </div>
      
      {
        activeTab==="requestor" && (
      <div style={{width:"413px" , height:"331px" , padding:"24px" , flexDirection:"column" , alignItems:"flex-start" , gap:"16px"}}>
        <h2 style={{fontFamily:"Roboto" , fontSize:"19px", fontStyle:"normal" , fontWeight:"700", lineHeight:"normal" , color:"#4A4A4A"}}> Need Attention</h2>
         <div className="text-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160" fill="none" className="mx-auto mb-4">
      <path d="M98.2001 128.473C61.6856 128.412 14.8935 123.991 14.4757 82.9727C14.0579 41.9549 44.4853 56.6751 74.1511 41.802C119.504 14.2154 148.352 41.4824 148.397 72.5892C148.441 103.696 134.715 128.534 98.2001 128.473Z" fill="#D7EEF4"/>
      <rect x="10" y="55.4089" width="70.9333" height="10.2667" rx="5.13333" fill="#77B0BE"/>
      <rect x="79.0667" y="101.142" width="70.9333" height="10.2667" rx="5.13333" fill="#77B0BE"/>
      <rect x="19.5826" y="72.319" width="118.533" height="19.6" rx="7" fill="#0696A6"/>
      <circle cx="110.209" cy="81.1993" r="17.2667" fill="#F6FDFF"/>
      <path d="M108.804 90.066V83.5282H102.276C101.502 83.5282 100.876 82.9014 100.876 82.1282C100.876 81.355 101.502 80.7282 102.276 80.7282H108.804V74.1994C108.804 73.4262 109.431 72.7995 110.204 72.7994C110.978 72.7994 111.604 73.4262 111.604 74.1994V80.7282H118.142C118.915 80.7282 119.542 81.355 119.542 82.1282C119.542 82.9014 118.915 83.5282 118.142 83.5282H111.604V90.066C111.604 90.8392 110.978 91.466 110.204 91.466C109.431 91.466 108.804 90.8392 108.804 90.066Z" fill="#0696A6"/>
      <path d="M122.328 51.0679C122.328 49.8197 121.316 48.8079 120.068 48.8079C118.82 48.8079 117.808 49.8197 117.808 51.0679C117.808 52.316 118.82 53.3278 120.068 53.3278V55.1357C117.821 55.1357 116 53.3145 116 51.0679C116 48.8212 117.821 47 120.068 47C122.314 47 124.136 48.8212 124.136 51.0679C124.136 53.3145 122.314 55.1357 120.068 55.1357V53.3278C121.316 53.3278 122.328 52.316 122.328 51.0679Z" fill="#77B0BE"/>
      <circle cx="49.0679" cy="105.068" r="3.06787" fill="#77B0BE" stroke="#77B0BE" stroke-width="2"/>
    </svg>

    <p className="text-lg font-medium text-gray-700">
      You have no requests that require attention.
    </p>
  </div>
      </div>
        )
      }


      </div>
</div>
  );
}
