import { TabType } from './Types/index';

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-full">
      <h2 className="font-['Roboto',sans-serif] font-bold text-[19px] text-[#4a4a4a] mb-4">
        TRM Approvals
      </h2>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => onTabChange('requestor')}
          className={`px-3 py-1 rounded-lg text-sm font-['Roboto',sans-serif] transition-colors ${
            activeTab === 'requestor'
              ? 'bg-[#f7f7f7] text-[#727272] font-normal'
              : 'bg-white text-[#3f7b25] font-medium'
          }`}
        >
          Requestor
        </button>
        <button
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

      <div className="space-y-2">
        <p className="font-['Roboto',sans-serif] text-sm text-[#4a4a4a]">
          Welcome to the Technology Request Management Portal.
        </p>
        <p className="font-['Roboto',sans-serif] text-sm text-[#4a4a4a]">
          You may choose whether you want to view requests you've submitted or
          requests you approve.
        </p>
      </div>
    </div>
  );
}
