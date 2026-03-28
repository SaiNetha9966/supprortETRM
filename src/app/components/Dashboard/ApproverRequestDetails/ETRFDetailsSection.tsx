import { DashBoardRecordItem } from '../../Utils/UiUtilis';
import { DetailedRequest } from '../Data/mockData';

interface ETRFDetailsSectionProps {
  request: DetailedRequest;
  selectedRecord:DashBoardRecordItem | null;
}

export function ETRFDetailsSection({ request,selectedRecord }: ETRFDetailsSectionProps) {
  return (
    <div className="bg-white rounded-[8px] p-4 sm:p-6">
      <h2 className="font-['Roboto',sans-serif] font-bold text-[19px] text-[#4a4a4a] mb-6 sm:mb-8">
        ETRF Details
      </h2>

      <div className="space-y-6 sm:space-y-8">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Project Code Name
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[14px] text-[#4a4a4a] leading-[18px]">
              {selectedRecord?.project_code}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Client Name
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[14px] text-[#4a4a4a] leading-[18px]">
              {selectedRecord?.client_name}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Type Of Work
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[14px] text-[#4a4a4a] leading-[18px]">
              {selectedRecord?.type_of_work}
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Ironclad ID
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[15px] text-[#4a4a4a] leading-[20px]">
              {selectedRecord?.ironclad_id}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Radius ID
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[15px] text-[#4a4a4a] leading-[20px]">
              {selectedRecord?.radius_id}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              SAP Project ID
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[15px] text-[#4a4a4a] leading-[20px]">
              {selectedRecord?.sap_project_id}
            </p>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Expected Start Date
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[15px] text-[#4a4a4a] leading-[20px]">
              {/* {selectedRecord?.expectedStartDate} // need to map not getting in API */}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Expected End Date
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[15px] text-[#4a4a4a] leading-[20px]">
              {/* {selectedRecord?.expectedEndDate} // need to map not getting in API */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
