import { ApprovalRequest } from './Types/index';
import { StatusBadge } from './StatusBadge';

interface ApprovalCardProps {
  request: ApprovalRequest;
}

export function ApprovalCard({ request }: ApprovalCardProps) {
  return (
    <div className="bg-white border border-[#e4e4e4] rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <a
          href="#"
          className="font-['Roboto',sans-serif] font-medium text-base text-[#0369a3] underline hover:text-[#024870]"
        >
          {request.projectCodeName}
        </a>
        <StatusBadge status={request.requestStatus} />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="font-['Roboto',sans-serif] text-[#727272] text-xs mb-1">Client Name</p>
          <p className="font-['Roboto',sans-serif] text-[#181d1f]">{request.clientName}</p>
        </div>

        <div>
          <p className="font-['Roboto',sans-serif] text-[#727272] text-xs mb-1">Type of Work</p>
          <p className="font-['Roboto',sans-serif] text-[#181d1f]">{request.typeOfWork}</p>
        </div>

        <div>
          <p className="font-['Roboto',sans-serif] text-[#727272] text-xs mb-1">SAP Project ID</p>
          <p className="font-['Roboto',sans-serif] text-[#181d1f]">{request.sapProjectId}</p>
        </div>

        <div>
          <p className="font-['Roboto',sans-serif] text-[#727272] text-xs mb-1">Requestor</p>
          <p className="font-['Roboto',sans-serif] text-[#181d1f]">{request.requestor}</p>
        </div>

        <div>
          <p className="font-['Roboto',sans-serif] text-[#727272] text-xs mb-1">Submitted Date</p>
          <p className="font-['Roboto',sans-serif] text-[#181d1f]">{request.submittedDate}</p>
        </div>

        <div>
          <p className="font-['Roboto',sans-serif] text-[#727272] text-xs mb-1">Ironclad ID</p>
          <p className="font-['Roboto',sans-serif] text-[#181d1f]">{request.ironcladId}</p>
        </div>
      </div>

      {/* Additional IDs */}
      <div className="flex gap-4 pt-2 border-t border-[#e4e4e4] text-xs">
        <div>
          <span className="font-['Roboto',sans-serif] text-[#727272]">Radius: </span>
          <span className="font-['Roboto',sans-serif] text-[#181d1f]">{request.radiusId}</span>
        </div>
      </div>
    </div>
  );
}
