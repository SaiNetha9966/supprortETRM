import { RequestStatus } from './Types/index';

interface StatusBadgeProps {
  status: RequestStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: RequestStatus) => {
    if (status === 'Onboarding - Awaiting Response') {
      return {
        bg: 'bg-[#b0deeb]',
        text: 'text-[#024870]',
        label: 'Onboarding - Awaiting Response',
      };
    }
    if (status === 'Onboarding - Pending Approval') {
      return {
        bg: 'bg-[#ffd7a1]',
        text: 'text-[#b86a0f]',
        label: 'Onboarding - Pending Approval',
      };
    }
    if (status === 'Offboarding - Pending Approval') {
      return {
        bg: 'bg-[#ffd7a1]',
        text: 'text-[#b86a0f]',
        label: 'Offboarding - Pending Approval',
      };
    }
    if (status === 'Onboarding - In Progress') {
      return {
        bg: 'bg-[#ffd7a1]',
        text: 'text-[#b86a0f]',
        label: 'Onboarding - In Progress',
      };
    }
    if (status === 'Onboarding - Approved') {
      return {
        bg: 'bg-[#a5d192]',
        text: 'text-[#3f702a]',
        label: 'Onboarding - Approved',
      };
    }
    if (status === 'Closed Completed') {
      return {
        bg: 'bg-[#a5d192]',
        text: 'text-[#3f702a]',
        label: status,
      };
    }
    return {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      label: status,
    };
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`${config.bg} ${config.text} px-2 py-1 rounded text-xs font-['Roboto',sans-serif] font-medium whitespace-nowrap inline-block`}
    >
      {config.label}
    </span>
  );
}
