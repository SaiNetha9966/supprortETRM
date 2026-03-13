import { DetailedRequest } from '../Data/mockData';
import svgPaths from '../../../../imports/svg-9v12l09gyw';

interface RequestDetailHeaderProps {
  request: DetailedRequest;
  handleOpenOrClodeApprovalModel : () => void;
    handleOpenOrClodeRejectionModel : () => void;
    handleRequestClarity : () => void;

}

export function RequestDetailHeader({ request,handleOpenOrClodeApprovalModel,handleOpenOrClodeRejectionModel,handleRequestClarity }: RequestDetailHeaderProps) {
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
                // to="/"
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
            <button className="bg-[#498e2b] h-[32px] px-[12px] rounded-[2px] min-w-[94px] hover:bg-[#3f7b25] transition-colors" style={{cursor:"pointer"}} onClick={handleOpenOrClodeApprovalModel}>
              <p className="font-['Roboto',sans-serif] font-medium text-[15px] text-white tracking-[0.3px] whitespace-nowrap">
                Approve Request
              </p>
            </button>
            
            <button className="bg-white h-[32px] px-[12px] rounded-[2px] min-w-[94px] border border-[#498e2b] hover:bg-[#f7f7f7] transition-colors" style={{cursor:"pointer"}}  onClick={handleRequestClarity}>
              <p className="font-['Roboto',sans-serif] font-medium text-[15px] text-[#498e2b] tracking-[0.3px] whitespace-nowrap">
                Request Clarification
              </p>
            </button>
            
            <button className="bg-white h-[32px] px-[12px] rounded-[2px] min-w-[94px] border border-[#cb282e] hover:bg-[#fff5f5] transition-colors" style={{cursor:"pointer"}} onClick={handleOpenOrClodeRejectionModel}>
              <p className="font-['Roboto',sans-serif] font-medium text-[15px] text-[#cb282e] tracking-[0.3px] whitespace-nowrap">
                Reject Request
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
