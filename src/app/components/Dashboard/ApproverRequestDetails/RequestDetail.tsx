import { useEffect, useState } from 'react';
import { getDetailedRequest, DetailedRequest } from '../Data/mockData';
import { RequestDetailHeader } from './RequestDetailHeader';
import { ETRFDetailsSection } from './ETRFDetailsSection';
import { ApproversSection } from './ApproversSection';
import { RequestedToolsSection } from './RequestedToolsSection';
import { RequestedUsersSection } from './RequestedUsersSection';
import ConfirmationModal from '../Modal/ConfirmationModal';
import SuccessModal from '../Modal/SuccessModal';
import { OffOnBoardRequest } from './RequestTales';

interface RequestDetailProps {
  onRequestDetailsView: (value: boolean) => void;
  activeTab: string;
  onUpdateRequest: () => void;
}

export default function RequestDetail({
  activeTab,
  onRequestDetailsView,
  onUpdateRequest,
}: RequestDetailProps) {
  const [request, setRequest] = useState<DetailedRequest | null>(null);
  const [isApproveOpen, setApproveOpen] = useState(false);
  const [isRejectOpen, setRejectOpen] = useState(false);
  const [note, setNote] = useState('');
  const [open, setOpen] = useState<null | string>(null);
  const [successNote, setSuccessNote] = useState('');

  const ApprovedIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="#2E7D32"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="#2E7D32"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const RejectedIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="#C10007"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 9L9 15"
        stroke="#C10007"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 9L15 15"
        stroke="#C10007"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const ClarificationIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="#E17100"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.09 9.00008C9.3251 8.33175 9.78915 7.76819 10.4 7.40921C11.0108 7.05024 11.7289 6.91902 12.4272 7.03879C13.1255 7.15857 13.7588 7.52161 14.2151 8.06361C14.6713 8.60561 14.9211 9.2916 14.92 10.0001C14.92 12.0001 11.92 13.0001 11.92 13.0001"
        stroke="#E17100"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 17H12.01"
        stroke="#E17100"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const handleOpenOrClodeApprovalModel = (): void => {
    if (isApproveOpen) {
      setApproveOpen(false);
    } else {
      setApproveOpen(true);
    }
  };
  const handleOpenOrClodeRejectionModel = (): void => {
    if (isRejectOpen) {
      setRejectOpen(false);
    } else {
      setRejectOpen(true);
    }
  };

  const handleApproveRequest = () => {
    setApproveOpen(false);
    setOpen('approve');
  };

  const handleRejectRequest = () => {
    setRejectOpen(false);
    setOpen('reject');
  };

  const handleRequestClarity = () => {
    setOpen('clarify');
  };

  useEffect(() => {
    const data = getDetailedRequest('1');
    setRequest(data);
  }, []);

  if (!request) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-[#727272] font-['Roboto',sans-serif]">Loading...</div>
      </div>
    );
  }

  return (
    <main className="flex-1 w-full relative">
      <ConfirmationModal
        isOpen={isApproveOpen}
        title='Approve Request "Orchid"'
        title2="You are about to approve this request."
        description="Once approved, the request will move to the provisioning stage."
        noteLabel="Approval Note"
        notePlaceholder="Add a note for the requestor or provisioning team."
        noteValue={note}
        onNoteChange={setNote}
        onCancel={() => setApproveOpen(false)}
        onConfirm={handleApproveRequest}
        confirmText="Approve Request"
        confirmColor="green"
      />
      <ConfirmationModal
        isOpen={isRejectOpen}
        title='Reject Request "Orchid"'
        title2="Are you sure you want to reject this request?"
        description="This action will stop the approval process and the request will be marked as rejected."
        noteLabel="Rejection Reason"
        notePlaceholder="Explain why this request is being rejected."
        noteRequired
        noteValue={note}
        onNoteChange={setNote}
        onCancel={() => setRejectOpen(false)}
        onConfirm={handleRejectRequest}
        confirmText="Reject Request"
        confirmColor="red"
      />

      <SuccessModal
        isOpen={open === 'approve'}
        title="Request Approved"
        description="The request has been approved and will now move to provisioning."
        icon={ApprovedIcon}
        onClose={() => setOpen(null)}
        backgroundColor="#A5D192"
      />

      {/* Rejected */}
      <SuccessModal
        isOpen={open === 'reject'}
        title="Request Rejected"
        description="The request has been rejected and the requestor has been notified."
        icon={RejectedIcon}
        onClose={() => setOpen(null)}
        backgroundColor="#F1B5B7"
      />

      {/* Clarification */}
      <SuccessModal
        isOpen={open === 'clarify'}
        title="Clarification Requested"
        description="Your request for additional information has been sent to the requestor."
        icon={ClarificationIcon}
        onClose={() => setOpen(null)}
        backgroundColor="#FEF3C6"
      />

      <RequestDetailHeader
        request={request}
        handleOpenOrClodeApprovalModel={handleOpenOrClodeApprovalModel}
        handleOpenOrClodeRejectionModel={handleOpenOrClodeRejectionModel}
        handleRequestClarity={handleRequestClarity}
        onRequestDetailsView={onRequestDetailsView}
        activeTab={activeTab}
        onUpdateRequest={onUpdateRequest}
      />
      <div className="px-4 sm:px-6 lg:px-20 py-6 space-y-6 max-w-[1440px] mx-auto pb-20">
        <ETRFDetailsSection request={request} />
        <ApproversSection request={request} />
        <RequestedToolsSection activeTab={activeTab} request={request} />
        <RequestedUsersSection activeTab={activeTab} request={request} />
        {activeTab === 'requestor' && <OffOnBoardRequest />}
      </div>
    </main>
  );
}
