import { DetailedRequest, mockOffOnBoardRequestData } from '../Data/mockData';
import { StatusBadge } from '../StatusBadge';

interface OffOnBoardRequestProps {}

export function OffOnBoardRequest({}: OffOnBoardRequestProps) {
  return (
    <div className="bg-white rounded-lg p-6 w-full">
      <h1>Onboarding & Offboarding Requests</h1>
      <div className="hidden lg:block overflow-x-auto -mx-6 px-6">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full border border-[#ccc] rounded-lg overflow-hidden">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-3 text-left border-b border-[#ccc] font-['Roboto',sans-serif] font-bold text-[13px] text-[#181d1f] whitespace-nowrap cursor-pointer">
                  Request Number
                </th>
                <th className="px-4 py-3 text-left border-b border-[#ccc] font-['Roboto',sans-serif] font-bold text-[13px] text-[#181d1f] whitespace-nowrap cursor-pointer">
                  Request Type
                </th>
                <th className="px-4 py-3 text-left border-b border-[#ccc] font-['Roboto',sans-serif] font-bold text-[13px] text-[#181d1f] whitespace-nowrap cursor-pointer">
                  Assigned To
                </th>
                <th className="px-4 py-3 text-left border-b border-[#ccc] font-['Roboto',sans-serif] font-bold text-[13px] text-[#181d1f] whitespace-nowrap cursor-pointer">
                  Assignment Group
                </th>

                <th className="px-4 py-3 text-left border-b border-[#ccc] font-['Roboto',sans-serif] font-bold text-[13px] text-[#181d1f] whitespace-nowrap cursor-pointer">
                  Item
                </th>

                <th className="px-4 py-3 text-left border-b border-[#ccc] font-['Roboto',sans-serif] font-bold text-[13px] text-[#181d1f] whitespace-nowrap cursor-pointer">
                  Opened
                </th>
                <th className="px-4 py-3 text-left border-b border-[#ccc] font-['Roboto',sans-serif] font-bold text-[13px] text-[#181d1f] whitespace-nowrap cursor-pointer">
                  State
                </th>
              </tr>
            </thead>
            <tbody>
              {mockOffOnBoardRequestData.map((request, index) => (
                <tr
                  key={index}
                  className={`transition-colors hover:bg-[#e8f5e9] ${
                    index % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'
                  }`}
                >
                  <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-sm text-[#181d1f] whitespace-nowrap">
                    {request.requestId}
                  </td>
                  <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-sm text-[#181d1f] whitespace-nowrap">
                    {request.requestType}
                  </td>
                  <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-sm text-[#181d1f] whitespace-nowrap">
                    {request.assignedTo}
                  </td>
                  <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-sm text-[#181d1f] whitespace-nowrap">
                    {request.assignGroup}
                  </td>
                  <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-sm text-[#181d1f] whitespace-nowrap">
                    {request.item}
                  </td>
                  <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-sm text-[#181d1f] whitespace-nowrap">
                    {request.open}
                  </td>
                  <td className="px-4 py-2.5">
                    <StatusBadge status={request.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
