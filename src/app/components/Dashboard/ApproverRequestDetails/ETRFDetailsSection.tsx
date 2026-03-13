import { DetailedRequest } from '../Data/mockData';

interface ETRFDetailsSectionProps {
  request: DetailedRequest;
}

export function ETRFDetailsSection({ request }: ETRFDetailsSectionProps) {
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
              {request.projectCodeName}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Client Name
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[14px] text-[#4a4a4a] leading-[18px]">
              {request.clientName}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Type Of Work
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[14px] text-[#4a4a4a] leading-[18px]">
              {request.typeOfWork}
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
              {request.ironcladId}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Radius ID
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[15px] text-[#4a4a4a] leading-[20px]">
              {request.radiusId}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              SAP Project ID
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[15px] text-[#4a4a4a] leading-[20px]">
              {request.sapProjectId}
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
              {request.expectedStartDate}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Expected End Date
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-[15px] text-[#4a4a4a] leading-[20px]">
              {request.expectedEndDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
