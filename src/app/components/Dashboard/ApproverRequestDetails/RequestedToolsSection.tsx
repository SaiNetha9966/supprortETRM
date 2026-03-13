import { DetailedRequest } from '../Data/mockData';

interface RequestedToolsSectionProps {
  request: DetailedRequest;
}

export function RequestedToolsSection({ request }: RequestedToolsSectionProps) {
  return (
    <div className="bg-white rounded-[8px] p-4 sm:p-6">
      <h2 className="font-['Roboto',sans-serif] font-bold text-[19px] text-[#4a4a4a] mb-6 sm:mb-8">
        Requested Tools
      </h2>

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
