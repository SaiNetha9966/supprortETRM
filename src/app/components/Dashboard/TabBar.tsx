import RequestFormCard from './ApproverRequestDetails/RequestFormCard';
import NeedAttention from './NeedAttention';
import { TabType } from './Types/index';

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const items = [
    { name: 'Aster', organization: 'Pacific Data Systems', status: 'Clarification Required' },
    { name: 'Poppy', organization: 'Global Technology Partners', status: 'Missing Identifier' },
    { name: 'Rose', organization: 'Apex Solutions Group', status: 'Clarification Required' },
    { name: 'Lily', organization: '', status: 'Missing Identifier' },
  ];
  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-full">
      <div style={{ display: 'flex' }}>
        <div>
          <div style={{ display: 'flex' }}>
            <h2 className="font-['Roboto',sans-serif] font-bold text-[19px] text-[#4a4a4a] mb-4">
              TRM Approvals
            </h2>

            <div className="flex gap-2 mb-4">
              <button
                style={{ cursor: 'pointer' }}
                onClick={() => onTabChange('requestor')}
                className={`px-3 py-1 rounded-lg text-sm font-['Roboto',sans-serif] transition-colors ${
                  activeTab === 'requestor'
                    ? 'bg-white text-[#3f7b25] font-medium'
                    : 'bg-[#f7f7f7] text-[#727272] font-normal'
                }`}
              >
                Requestor
              </button>
              <button
                style={{ cursor: 'pointer' }}
                onClick={() => onTabChange('approver')}
                className={`px-3 py-1 rounded-lg text-sm font-['Roboto',sans-serif] transition-colors ${
                  activeTab === 'approver'
                    ? 'bg-white text-[#3f7b25] font-medium'
                    : 'bg-[#f7f7f7] text-[#727272] font-normal'
                }`}
              >
                Approver
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] text-sm text-[#4a4a4a]">
              Welcome to the Technology Request Management Portal.
            </p>
            <p className="font-['Roboto',sans-serif] text-sm text-[#4a4a4a]">
              You may choose whether you want to view requests you've submitted or requests you
              approve.
            </p>
          </div>
          {activeTab === 'requestor' && (
            <div style={{ display: 'flex', gap: '24px', marginTop: '40px' }}>
              <RequestFormCard
                title="Engagement Technology Request Form (ETRF)"
                description="This form should be used for all client projects requiring technology or internal projects requiring specialized tools maintained in client technology environments."
                buttonText="+ Create New ETRF"
                onClick={() => alert('ETRF form creation')}
              />
              <RequestFormCard
                title="Internal Technology Request Form (ITRF)"
                description="This form should be used when work is internal, experimental or product focused and does not and will not contain client data."
                buttonText="+ Create New ITRF"
                onClick={() => alert('ITRF form creation')}
              />
            </div>
          )}
        </div>

        {activeTab === 'requestor' && <NeedAttention count={items.length} items={items} />}
      </div>
    </div>
  );
}
