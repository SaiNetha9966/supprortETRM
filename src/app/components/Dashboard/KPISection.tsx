import { KPICard } from './KPICard';

interface KPISectionProps {
  pendingApproval: number;
  awaitingResponse: number;
  approved: number;
  rejected: number;
}

export function KPISection({
  pendingApproval,
  awaitingResponse,
  approved,
  rejected,
}: KPISectionProps) {
  return (
    <div className="bg-white rounded-lg p-6 w-full">
      <h2 className="font-['Roboto',sans-serif] font-bold text-[19px] text-[#4a4a4a] mb-6">
        My Approval Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard
          title="Pending Approval"
          value={pendingApproval}
          icon="clock"
          showInfo
        />
        <KPICard
          title="Awaiting Response"
          value={awaitingResponse}
          icon="message"
          showInfo
        />
        <KPICard title="Approved" value={approved} icon="check" />
        <KPICard title="Rejected" value={rejected} icon="x" />
      </div>
    </div>
  );
}
