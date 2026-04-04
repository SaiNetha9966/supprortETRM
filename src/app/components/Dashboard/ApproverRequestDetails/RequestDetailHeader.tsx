import { DetailedRequest } from '../Data/mockData';
import svgPaths from '../../../../imports/svg-9v12l09gyw';
import { DashBoardRecordItem } from '../../Utils/UiUtilis';

interface RequestDetailHeaderProps {
  request: DetailedRequest;
  handleOpenOrClodeApprovalModel: () => void;
  handleOpenOrClodeRejectionModel: () => void;
  handleRequestClarificationModel:() => void;
  onRequestDetailsView: (value: boolean,approvalID:string) => void;
  activeTab: string;
  onUpdateRequest: (ironClacId: string, approverId: string) => void;
  onAddToolButton: () => void;
  onAddUserButton: () => void;
  selectedRecord:DashBoardRecordItem | null;
}

export function RequestDetailHeader({
  request,
  handleOpenOrClodeApprovalModel,
  handleOpenOrClodeRejectionModel,
  handleRequestClarificationModel,
  onRequestDetailsView,
  activeTab,
  onUpdateRequest,
  onAddToolButton,
  onAddUserButton,
  selectedRecord
}: RequestDetailHeaderProps) {
  console.log("selectedRecord in header",selectedRecord)
  const getStatusColor = () => {
    if (request.requestStatus.includes('Approved')) {
      return { bg: '#dff0db', border: '#a5d192', text: '#3f7b25' };
    } else if (request.requestStatus.includes('Pending')) {
      return { bg: '#fec', border: '#f9d250', text: '#b86a0f' };
    } else if (request.requestStatus.includes('Awaiting')) {
      return { bg: '#fff4e5', border: '#ffd666', text: '#d48806' };
    }
    return { bg: '#f1f1f1', border: '#ccc', text: '#727272' };
  };

  const statusColors = getStatusColor();
  // const {project_code,state,request_status,requestor,submitted_date} =selectedRecord;

  return (
    <div className="bg-white border-b border-[#e4e4e4] sticky top-0 z-10 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-20 py-6 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left Side - Title and Info */}
          <div className="space-y-4 flex-1">
            {/* Back Button and Title */}
            <div className="flex items-start gap-3">
              <button
                style={{ cursor: 'pointer' }}
                onClick={() => onRequestDetailsView(false,"")}
                className="flex items-center justify-center mt-1 shrink-0 hover:bg-[#f7f7f7] rounded p-1 transition-colors"
              >
                <div className="rotate-180">
                  <div className="overflow-clip relative size-[24px]">
                    <div className="absolute flex inset-[16.67%] items-center justify-center">
                      <div className="-rotate-90 flex-none size-[16px]">
                        <div className="relative size-full">
                          <svg
                            className="absolute block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 16 16"
                          >
                            <path d={svgPaths.p3b5e100} fill="#4A4A4A" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-['Roboto',sans-serif] font-bold text-[23px] text-[#111827]">
                    {selectedRecord?.project_code}
                  </h1>

                  {/* Status Badges */}
                  <div className="flex flex-wrap gap-3">
                    {request.online && (
                      <div
                        className="flex h-[24px] items-center px-[9px] rounded-[240px] relative"
                        style={{ backgroundColor: '#dff0db' }}
                      >
                        <div
                          aria-hidden="true"
                          className="absolute border border-solid inset-0 pointer-events-none rounded-[240px]"
                          style={{ borderColor: '#a5d192' }}
                        />
                        <p
                          className="font-['Roboto',sans-serif] font-normal text-[13px] whitespace-nowrap"
                          style={{ color: '#3f7b25' }}
                        >
                          {selectedRecord?.state}
                        </p>
                      </div>
                    )}

                    <div
                      className="flex h-[24px] items-center px-[9px] rounded-[240px] relative"
                      style={{ backgroundColor: statusColors.bg }}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute border border-solid inset-0 pointer-events-none rounded-[240px]"
                        style={{ borderColor: statusColors.border }}
                      />
                      <p
                        className="font-['Roboto',sans-serif] font-normal text-[13px] whitespace-nowrap"
                        style={{ color: statusColors.text }}
                      >
                        {selectedRecord?.request_status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Requestor Info */}
                {
                  activeTab === "requestor" ? (
                  <div className="flex flex-wrap gap-4 font-['Roboto',sans-serif] text-[15px] text-[#727272]">
                  <p>
                    <span>Last Updates: </span>
                     <span className="font-bold">
                                     {new Date(request.submittedDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                      </span>
                  </p>
                  <p>
                    <span>Approved by: </span>
                                       <span className="font-bold">{request.fullRequestorName}</span>

                  </p>

                </div>

                  ) :(
                   <div className="flex flex-wrap gap-4 font-['Roboto',sans-serif] text-[15px] text-[#727272]">
                  <p>
                    <span>Requestor: </span>
                    <span className="font-bold">{selectedRecord?.requestor}</span>
                  </p>
                  <p>
                    <span>Submitted: </span>
                    <span className="font-bold">
                                     {new Date(selectedRecord?.submitted_date ?? "").toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                      </span>
                  </p>

                </div>
                  )
                }


              </div>
            </div>
          </div>

          {/* Right Side - Action Buttons */}
          <div className="flex flex-wrap gap-5 shrink-0">
            {activeTab === 'requestor' && (
              <>
<button
  onClick={() => onUpdateRequest(selectedRecord?.ironclad_id || '', selectedRecord?.approvalID || '')}
  className="
    flex items-center justify-center
    gap-[4px]
    h-[32px] min-w-[94px]
    px-[12px] pl-[8px]
    rounded-[2px]
    border border-[#498E2B]
    bg-[#FFF]
    transition-colors
    hover:bg-gray-100
    cursor-pointer
  "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-[20px] h-[20px]"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M13.1067 8.07174L11.9283 6.8934L4.16667 14.6551V15.8334H5.345L13.1067 8.07174ZM14.285 6.8934L15.4633 5.71507L14.285 4.53674L13.1067 5.71507L14.285 6.8934ZM6.035 17.5001H2.5V13.9642L13.6958 2.7684C13.8521 2.61218 14.064 2.52441 14.285 2.52441C14.506 2.52441 14.7179 2.61218 14.8742 2.7684L17.2317 5.1259C17.3879 5.28218 17.4757 5.4941 17.4757 5.71507C17.4757 5.93604 17.3879 6.14796 17.2317 6.30424L6.035 17.5001Z"
      fill="#498E2B"
    />
  </svg>
  <span className="font-['Roboto',sans-serif] font-medium text-[15px] leading-[13px] tracking-[0.3px] text-[#498E2B] text-center whitespace-nowrap">
    Update Request
  </span>
</button>
<button
  onClick={onAddToolButton}
  className="
    flex items-center justify-center
    gap-[4px]
    h-[32px] min-w-[94px]
    px-[12px] pl-[8px]
    rounded-[2px]
    border border-[#498E2B]
    bg-[#FFF]
    transition-colors
    hover:bg-gray-100
    cursor-pointer
  "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-[20px] h-[20px] fill-[#498E2B]"
    viewBox="0 0 20 20"
  >
    <path
      d="M8.13125 18.125L7.725 15.5656C7.46771 15.4708 7.19688 15.3422 6.9125 15.1797C6.62813 15.0172 6.3776 14.8479 6.16094 14.6719L3.76406 15.7687L1.875 12.4375L4.06875 10.8328C4.04167 10.7109 4.02474 10.5721 4.01797 10.4164C4.0112 10.2607 4.00781 10.1219 4.00781 10C4.00781 9.87813 4.0112 9.73932 4.01797 9.58359C4.02474 9.42786 4.04167 9.28906 4.06875 9.16719L1.875 7.5625L3.76406 4.23125L6.16094 5.32813C6.3776 5.15208 6.62813 4.98281 6.9125 4.82031C7.19688 4.65781 7.46771 4.53594 7.725 4.45469L8.13125 1.875H11.8687L12.275 4.43437C12.5323 4.52917 12.8065 4.65443 13.0977 4.81016C13.3888 4.96589 13.6359 5.13854 13.8391 5.32813L16.2359 4.23125L18.125 7.5625L15.9313 9.12656C15.9583 9.26198 15.9753 9.40755 15.982 9.56328C15.9888 9.71901 15.9922 9.86458 15.9922 10C15.9922 10.1354 15.9888 10.2776 15.982 10.4266C15.9753 10.5755 15.9583 10.7177 15.9313 10.8531L18.125 12.4375L16.2359 15.7687L13.8391 14.6719C13.6224 14.8479 13.3753 15.0206 13.0977 15.1898C12.8201 15.3591 12.5458 15.4844 12.275 15.5656L11.8687 18.125H8.13125ZM10 12.6406C10.7312 12.6406 11.3542 12.3833 11.8687 11.8687C12.3833 11.3542 12.6406 10.7312 12.6406 10C12.6406 9.26875 12.3833 8.64583 11.8687 8.13125C11.3542 7.61667 10.7312 7.35938 10 7.35938C9.26875 7.35938 8.64583 7.61667 8.13125 8.13125C7.61667 8.64583 7.35938 9.26875 7.35938 10C7.35938 10.7312 7.61667 11.3542 8.13125 11.8687C8.64583 12.3833 9.26875 12.6406 10 12.6406Z"
    />
  </svg>
  <span className="font-['Roboto',sans-serif] font-medium text-[15px] leading-[13px] tracking-[0.3px] text-[#498E2B] text-center whitespace-nowrap">
    Add Tool
  </span>
</button>

                <button
                  className="
    flex items-center justify-center 
    gap-[var(--button-primary-container-hpadding-sm-icon-left,4px)]
    h-[var(--button-secondary-container-size-md,32px)]
    min-w-[94px]
    px-[var(--button-secondary-container-hpadding-md,12px)]
    pl-[var(--button-secondary-container-hpadding-md-icon,8px)]
    rounded-[var(--button-secondary-container-radius-all,2px)]
    border border-[var(--button-secondary-border-color-default,#498E2B)]
    bg-[var(--button-secondary-container-color-default,#FFF)]
    transition-colors
    hover:bg-gray-100
    cursor-pointer
  "
                  onClick={onAddUserButton}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M15.0002 11.6666V9.16658H12.5002V7.49992H15.0002V4.99992H16.6668V7.49992H19.1668V9.16658H16.6668V11.6666H15.0002ZM7.50016 9.99992C6.5835 9.99992 5.79877 9.67353 5.146 9.02075C4.49322 8.36797 4.16683 7.58325 4.16683 6.66659C4.16683 5.74992 4.49322 4.9652 5.146 4.31242C5.79877 3.65964 6.5835 3.33325 7.50016 3.33325C8.41683 3.33325 9.20155 3.65964 9.85433 4.31242C10.5071 4.9652 10.8335 5.74992 10.8335 6.66659C10.8335 7.58325 10.5071 8.36797 9.85433 9.02075C9.20155 9.67353 8.41683 9.99992 7.50016 9.99992ZM0.833496 16.6666V14.3333C0.833496 13.861 0.955024 13.427 1.19808 13.0312C1.44114 12.6353 1.76405 12.3333 2.16683 12.1249C3.02794 11.6944 3.90294 11.3714 4.79183 11.1562C5.68072 10.9409 6.5835 10.8333 7.50016 10.8333C8.41683 10.8333 9.31961 10.9409 10.2085 11.1562C11.0974 11.3714 11.9724 11.6944 12.8335 12.1249C13.2363 12.3333 13.5592 12.6353 13.8022 13.0312C14.0453 13.427 14.1668 13.861 14.1668 14.3333V16.6666H0.833496ZM2.50016 14.9999H12.5002V14.3333C12.5002 14.1805 12.462 14.0416 12.3856 13.9166C12.3092 13.7916 12.2085 13.6944 12.0835 13.6249C11.3335 13.2499 10.5766 12.9687 9.81266 12.7812C9.04877 12.5937 8.27794 12.4999 7.50016 12.4999C6.72239 12.4999 5.95155 12.5937 5.18766 12.7812C4.42377 12.9687 3.66683 13.2499 2.91683 13.6249C2.79183 13.6944 2.69114 13.7916 2.61475 13.9166C2.53836 14.0416 2.50016 14.1805 2.50016 14.3333V14.9999ZM7.50016 8.33325C7.9585 8.33325 8.35086 8.17006 8.67725 7.84367C9.00364 7.51728 9.16683 7.12492 9.16683 6.66659C9.16683 6.20825 9.00364 5.81589 8.67725 5.4895C8.35086 5.16311 7.9585 4.99992 7.50016 4.99992C7.04183 4.99992 6.64947 5.16311 6.32308 5.4895C5.99669 5.81589 5.8335 6.20825 5.8335 6.66659C5.8335 7.12492 5.99669 7.51728 6.32308 7.84367C6.64947 8.17006 7.04183 8.33325 7.50016 8.33325Z"
                      fill="#498E2B"
                    />
                  </svg>
                  <span className="font-roboto font-medium text-sm text-[#498E2B] tracking-[0.3px] whitespace-nowrap">
                    Add User
                  </span>
                </button>

                <button
                  className="
    flex items-center justify-center
    gap-[var(--button-primary-container-hpadding-sm-icon-left,4px)]
    h-[var(--button-secondary-container-size-md,32px)]
    min-w-[94px]
    px-[var(--button-secondary-container-hpadding-md,12px)]
    pl-[var(--button-secondary-container-hpadding-md-icon,8px)]
    rounded-[var(--button-secondary-container-radius-all,2px)]
    border border-[var(--button-secondary-border-color-danger-default,#CB282E)]
    bg-[var(--button-secondary-container-color-default,#FFF)]
    transition-colors
    hover:bg-gray-100
    cursor-pointer
  "
                  // onClick={handleStartOffboarding}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="var(--button-secondary-icon-size-md,15px)"
                    height="var(--button-secondary-icon-size-md,15px)"
                    viewBox="0 0 15 15"
                    fill="none"
                  >
                    <path
                      d="M1.66667 15C1.20833 15 0.815972 14.8368 0.489583 14.5104C0.163194 14.184 0 13.7917 0 13.3333V1.66667C0 1.20833 0.163194 0.815972 0.489583 0.489583C0.815972 0.163194 1.20833 0 1.66667 0H7.5V1.66667H1.66667V13.3333H7.5V15H1.66667ZM10.8333 11.6667L9.6875 10.4583L11.8125 8.33333H5V6.66667H11.8125L9.6875 4.54167L10.8333 3.33333L15 7.5L10.8333 11.6667Z"
                      fill="var(--button-secondary-icon-color-danger-default,#CB282E)"
                    />
                  </svg>
                  <span className="font-roboto font-medium text-sm text-[#CB282E] tracking-[0.3px] whitespace-nowrap">
                    Start Offboarding
                  </span>
                </button>
              </>
            )}
            {activeTab === 'approver' && (
              <>
                <button
                  className="bg-[#498e2b] h-[32px] px-[12px] rounded-[2px] min-w-[94px] hover:bg-[#3f7b25] transition-colors"
                  style={{ cursor: 'pointer' }}
                  onClick={handleOpenOrClodeApprovalModel}
                >
                  <p className="font-['Roboto',sans-serif] font-medium text-[15px] text-white tracking-[0.3px] whitespace-nowrap">
                    Approve Request
                  </p>
                </button>

                <button
                  className="bg-white h-[32px] px-[12px] rounded-[2px] min-w-[94px] border border-[#498e2b] hover:bg-[#f7f7f7] transition-colors"
                  style={{ cursor: 'pointer' }}
                  onClick={handleRequestClarificationModel}
                >
                  <p className="font-['Roboto',sans-serif] font-medium text-[15px] text-[#498e2b] tracking-[0.3px] whitespace-nowrap">
                    Request Clarification
                  </p>
                </button>

                <button
                  className="bg-white h-[32px] px-[12px] rounded-[2px] min-w-[94px] border border-[#cb282e] hover:bg-[#fff5f5] transition-colors"
                  style={{ cursor: 'pointer' }}
                  onClick={handleOpenOrClodeRejectionModel}
                >
                  <p className="font-['Roboto',sans-serif] font-medium text-[15px] text-[#cb282e] tracking-[0.3px] whitespace-nowrap">
                    Reject Request
                  </p>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
