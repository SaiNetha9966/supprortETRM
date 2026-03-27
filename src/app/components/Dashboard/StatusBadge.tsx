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
if (status === 'Onboarding - Pending Approval' || status === 'Offboarding - Pending Approval' || status === 'Onboarding - In Progress') {
  return {
    bg: 'bg-[#FEC]', // background from figma (#FEC)
    text: 'text-[#b86a0f]',
    label: status,
    border: 'border border-[#F9D250]',
    radius: 'rounded-full', // pill shape
    flex: 'flex items-center h-[20px] px-[9px]',
  };
}

    // if (status === 'Offboarding - Pending Approval') {
    //   return {
    //     bg: 'bg-[#ffd7a1]',
    //     text: 'text-[#b86a0f]',
    //     label: 'Offboarding - Pending Approval',
    //   };
    // }
    if (status === 'Onboarding - In Progress') {
      return {
        bg: 'bg-[#ffd7a1]',
        text: 'text-[#b86a0f]',
        label: 'Onboarding - In Progress',
      };
    }
if (status === 'Onboarding - Approved' || status === 'Offboarding - Approved') {
  return {
    bg: 'bg-[#DFF0DB]', // background from figma (#DFF0DB)
    text: 'text-[#3f702a]',
    label: 'Onboarding - Approved',
    border: 'border border-[#A5D192]', // green border
    radius: 'rounded-full', // pill shape (240px)
    flex: 'flex items-center h-[20px] px-[9px]', // layout
  };
}
if (status === 'Online') {
  return {
    bg: 'bg-[#DFF0DB]', // background from figma (#DFF0DB)
    text: 'text-[#3f702a]',
    label: 'Online',
    border: 'border border-[#A5D192]', // green border
    radius: 'rounded-full', // pill shape (240px)
    flex: 'flex items-center h-[20px] px-[9px]', // layout
  };
}
if (status === 'Destroy') {
  return {
    bg: 'bg-[#FFEBED]', // background from figma (#DFF0DB)
    text: 'text-[#BF494E]',
    label: 'Destroy',
    border: 'border border-[#F1B5B7]', // green border
    radius: 'rounded-full', // pill shape (240px)
    flex: 'flex items-center h-[20px] px-[9px]', // layout
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
  className={`${config.flex} ${config.bg} ${config.text} ${config.border} ${config.radius} text-xs font-['Roboto',sans-serif] font-medium whitespace-nowrap inline-block`}
>
  {config.label}
</span>
  );
}
