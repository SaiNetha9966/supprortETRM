import { DetailedRequest } from '../Data/mockData';

interface RequestedToolsSectionProps {
  request: DetailedRequest;
  activeTab: string;
  onAddToolButton: () => void;
}

export function RequestedToolsSection({
  activeTab,
  request,
  onAddToolButton,
}: RequestedToolsSectionProps) {
  return (
    <div className="bg-white rounded-[8px] p-4 sm:p-6">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 className="font-['Roboto',sans-serif] font-bold text-[19px] text-[#4a4a4a] mb-6 sm:mb-8">
          {activeTab === 'requestor' ? 'Tools' : 'Requested Tools'}
        </h2>
        {activeTab === 'requestor' && (
<div className="flex items-center gap-5">
  <button
    onClick={onAddToolButton}
    className="
      flex items-center justify-center
      h-[32px] min-w-[94px]
      px-[12px]
      rounded-[2px]
      border border-[#498E2B]
      bg-[#FFF]
      text-[#498E2B]
      font-['Roboto',sans-serif] text-[15px] font-medium leading-[13px] tracking-[0.3px]
      text-center
      transition-colors
      hover:bg-gray-100
      cursor-pointer
    "
  >
    Add Tools
  </button>

  <button
    onClick={onAddToolButton}
    className="
      flex items-center justify-center
      h-[32px] min-w-[94px]
      px-[12px]
      rounded-[2px]
      border border-[#CB282E]
      bg-[#FFF]
      text-[#CB282E]
      font-['Roboto',sans-serif] text-[15px] font-medium leading-[13px] tracking-[0.3px]
      text-center
      transition-colors
      hover:bg-gray-100
      cursor-pointer
    "
  >
    Offboard Tools
  </button>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 flex-shrink-0"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 8L5 15.2874L6.645 17L12 11.4372L17.355 17L19 15.2874L12 8Z"
      fill="#4A4A4A"
    />
  </svg>
</div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {request.requestedTools.map((tool, index) => (
          <div key={index} className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              {tool.name}
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[15px] text-[#4a4a4a] leading-[20px]">
              {tool.platform}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
