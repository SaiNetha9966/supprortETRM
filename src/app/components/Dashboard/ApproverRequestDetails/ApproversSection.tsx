import { DashBoardRecordItem } from '../../Utils/UiUtilis';
import { DetailedRequest } from '../Data/mockData';

interface ApproversSectionProps {
  request:DashBoardRecordItem | null;
}

export function ApproversSection({ request }: ApproversSectionProps) {
  return (
    <div className="bg-white rounded-[8px] p-4 sm:p-6">
      <h2 className="font-['Roboto',sans-serif] font-bold text-[19px] text-[#4a4a4a] mb-6 sm:mb-8">
        Approvers
      </h2>

      <div className="space-y-6 sm:space-y-8">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Primary PMD/Partner
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[15px] text-[#4a4a4a] leading-[20px]">
              {request?.managing_director}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Secondary PMD/Partner
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[14px] text-[#4a4a4a] leading-[18px]">
              {request?.secondary_managing_director}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Information Owner
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[14px] text-[#4a4a4a] leading-[18px]">
              {request?.information_owner}
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Delegate Information Owner
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[14px] text-[#4a4a4a] leading-[18px]">
              {request?.delegated_information_owner}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Project Manager
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[14px] text-[#4a4a4a] leading-[18px]">
              {request?.project_manager}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Approvers
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[14px] text-[#4a4a4a] leading-[18px]">
              {request?.approvers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
