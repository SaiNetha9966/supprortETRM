import { DetailedRequest } from '../Data/mockData';
import svgPaths from '../../../../imports/svg-9v12l09gyw';

interface RequestDetailHeaderProps {
  request: DetailedRequest;
  handleOpenOrClodeApprovalModel: () => void;
  handleOpenOrClodeRejectionModel: () => void;
  handleRequestClarity: () => void;
  onRequestDetailsView: (value: boolean) => void;
  activeTab: string;
  onUpdateRequest: () => void;
  onAddToolButton: () => void;
  onAddUserButton: () => void;
}

export function RequestDetailHeader({
  request,
  handleOpenOrClodeApprovalModel,
  handleOpenOrClodeRejectionModel,
  handleRequestClarity,
  onRequestDetailsView,
  activeTab,
  onUpdateRequest,
  onAddToolButton,
  onAddUserButton,
}: RequestDetailHeaderProps) {
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
                onClick={() => onRequestDetailsView(false)}
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
                    {request.projectCodeName}
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
                          Online
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
                        {request.requestStatus}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Requestor Info */}
                <div className="flex flex-wrap gap-4 font-['Roboto',sans-serif] text-[15px] text-[#727272]">
                  <p>
                    <span>Requestor: </span>
                    <span className="font-bold">{request.fullRequestorName}</span>
                  </p>
                  <p>
                    <span>Submitted: </span>
                    <span className="font-bold">{request.submittedDate}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Action Buttons */}
          <div className="flex flex-wrap gap-5 shrink-0">
            {activeTab === 'requestor' && (
              <>
                <button
                  className="
    flex items-center justify-center gap-[var(--button-primary-container-hpadding-sm-icon-left,4px)]
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
                  onClick={onUpdateRequest}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="var(--button-secondary-icon-size-md,20px)"
                    height="var(--button-secondary-icon-size-md,20px)"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M13.1067 8.07174L11.9283 6.8934L4.16667 14.6551V15.8334H5.345L13.1067 8.07174ZM14.285 6.8934L15.4633 5.71507L14.285 4.53674L13.1067 5.71507L14.285 6.8934ZM6.035 17.5001H2.5V13.9642L13.6958 2.7684C13.8521 2.61218 14.064 2.52441 14.285 2.52441C14.506 2.52441 14.7179 2.61218 14.8742 2.7684L17.2317 5.1259C17.3879 5.28218 17.4757 5.4941 17.4757 5.71507C17.4757 5.93604 17.3879 6.14796 17.2317 6.30424L6.035 17.5001Z"
                      fill="#498E2B"
                    />
                  </svg>
                  <span className="font-roboto font-medium text-sm text-[#498E2B] tracking-[0.3px] whitespace-nowrap">
                    Update Request
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
                  onClick={onAddToolButton}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="var(--button-secondary-icon-size-md,20px)"
                    height="var(--button-secondary-icon-size-md,20px)"
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M6.25625 16.25L5.85 13.6906C5.59271 13.5958 5.32188 13.4672 5.0375 13.3047C4.75313 13.1422 4.5026 12.9729 4.28594 12.7969L1.88906 13.8937L0 10.5625L2.19375 8.95781C2.16667 8.83594 2.14974 8.69714 2.14297 8.54141C2.1362 8.38568 2.13281 8.24688 2.13281 8.125C2.13281 8.00313 2.1362 7.86432 2.14297 7.70859C2.14974 7.55286 2.16667 7.41406 2.19375 7.29219L0 5.6875L1.88906 2.35625L4.28594 3.45313C4.5026 3.27708 4.75313 3.10781 5.0375 2.94531C5.32188 2.78281 5.59271 2.66094 5.85 2.57969L6.25625 0H9.99375L10.4 2.55937C10.6573 2.65417 10.9315 2.77943 11.2227 2.93516C11.5138 3.09089 11.7609 3.26354 11.9641 3.45313L14.3609 2.35625L16.25 5.6875L14.0563 7.25156C14.0833 7.38698 14.1003 7.53255 14.107 7.68828C14.1138 7.84401 14.1172 7.98958 14.1172 8.125C14.1172 8.26042 14.1138 8.4026 14.107 8.55156C14.1003 8.70052 14.0833 8.84271 14.0563 8.97812L16.25 10.5625L14.3609 13.8937L11.9641 12.7969C11.7474 12.9729 11.5003 13.1456 11.2227 13.3148C10.9451 13.4841 10.6708 13.6094 10.4 13.6906L9.99375 16.25H6.25625ZM8.125 10.7656C8.85625 10.7656 9.47917 10.5083 9.99375 9.99375C10.5083 9.47917 10.7656 8.85625 10.7656 8.125C10.7656 7.39375 10.5083 6.77083 9.99375 6.25625C9.47917 5.74167 8.85625 5.48438 8.125 5.48438C7.39375 5.48438 6.77083 5.74167 6.25625 6.25625C5.74167 6.77083 5.48438 7.39375 5.48438 8.125C5.48438 8.85625 5.74167 9.47917 6.25625 9.99375C6.77083 10.5083 7.39375 10.7656 8.125 10.7656Z"
                      fill="#498E2B"
                    />
                  </svg>
                  <span className="font-roboto font-medium text-sm text-[#498E2B] tracking-[0.3px] whitespace-nowrap">
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
                  onClick={handleRequestClarity}
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
