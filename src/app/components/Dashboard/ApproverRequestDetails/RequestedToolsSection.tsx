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
          <div>
            <button
              style={{
                marginRight: '20px',
                borderRadius: '2px',
                border: '1px solid #498E2B',
                color: '#498E2B',
                textAlign: 'center',
                fontFamily: 'Roboto',
                fontSize: '15px',
                fontWeight: '500',
                padding: '5px',
                width: '94px',
              }}
              onClick={onAddToolButton}
            >
              Add Tools
            </button>
            <button
              style={{
                marginRight: '20px',
                borderRadius: '2px',
                border: '1px solid #CB282E',
                color: '#CB282E',
                textAlign: 'center',
                fontFamily: 'Roboto',
                fontSize: '15px',
                fontWeight: '500',
                padding: '7px',
              }}
            >
              Offboard Tools
            </button>
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
