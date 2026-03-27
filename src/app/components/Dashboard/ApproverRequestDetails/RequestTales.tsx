import { DetailedRequest, mockOffOnBoardRequestData } from '../Data/mockData';
import { StatusBadge } from '../StatusBadge';

interface OffOnBoardRequestProps {}

export function OffOnBoardRequest({}: OffOnBoardRequestProps) {
  return (
<div className="bg-white rounded-lg p-6 w-full">
  {/* Heading */}
  <div className='my-4'>
      <h1 className="text-[#4A4A4A] font-['Roboto',sans-serif] text-[19px] font-bold leading-normal">
    Onboarding & Offboarding Requests
  </h1>
  </div>


  {/* Table wrapper */}
  <div className="hidden lg:block overflow-x-auto -mx-6 px-6">
    <div className="inline-block min-w-full align-middle">
      <table className="min-w-full border-b border-[#CCC] bg-[#FFF] rounded-tl-[8px] overflow-hidden">
        {/* Table Head */}
        <thead className="bg-white">
          <tr>
            <th className="px-4 py-3 text-left border-b border-[#CCC] font-['Roboto',sans-serif] text-[13px] font-bold leading-normal text-[#181D1F] whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer">
              Request Number
            </th>
            <th className="px-4 py-3 text-left border-b border-[#CCC] font-['Roboto',sans-serif] text-[13px] font-bold leading-normal text-[#181D1F] whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer">
              Request Type
            </th>
            <th className="px-4 py-3 text-left border-b border-[#CCC] font-['Roboto',sans-serif] text-[13px] font-bold leading-normal text-[#181D1F] whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer">
              Assigned To
            </th>
            <th className="px-4 py-3 text-left border-b border-[#CCC] font-['Roboto',sans-serif] text-[13px] font-bold leading-normal text-[#181D1F] whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer">
              Assignment Group
            </th>
            <th className="px-4 py-3 text-left border-b border-[#CCC] font-['Roboto',sans-serif] text-[13px] font-bold leading-normal text-[#181D1F] whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer">
              Item
            </th>
            <th className="px-4 py-3 text-left border-b border-[#CCC] font-['Roboto',sans-serif] text-[13px] font-bold leading-normal text-[#181D1F] whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer">
              Opened
            </th>
            <th className="px-4 py-3 text-left border-b border-[#CCC] font-['Roboto',sans-serif] text-[13px] font-bold leading-normal text-[#181D1F] whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer">
              State
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {mockOffOnBoardRequestData.map((request, index) => (
            <tr
              key={index}
              className={`transition-colors  ${
                index % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'
              }`}
            >
              <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-[14px] font-normal leading-[41px] text-[#181D1F] whitespace-nowrap overflow-hidden text-ellipsis">
                {request.requestId}
              </td>
              <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-[14px] font-normal leading-[41px] text-[#181D1F] whitespace-nowrap overflow-hidden text-ellipsis">
                {request.requestType}
              </td>
              <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-[14px] font-normal leading-[41px] text-[#181D1F] whitespace-nowrap overflow-hidden text-ellipsis">
                {request.assignedTo}
              </td>
              <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-[14px] font-normal leading-[41px] text-[#181D1F] whitespace-nowrap overflow-hidden text-ellipsis">
                {request.assignGroup}
              </td>
              <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-[14px] font-normal leading-[41px] text-[#181D1F] whitespace-nowrap overflow-hidden text-ellipsis">
                {request.item}
              </td>
              <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-[14px] font-normal leading-[41px] text-[#181D1F] whitespace-nowrap overflow-hidden text-ellipsis">
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
