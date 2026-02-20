import svgPaths from '../../../imports/svg-0ywn1y5h0h';

interface DataHandlingProps {
  selectOffboadingScope: string;
}

interface ToolItemProps {
  name: string;
  status: string;
}
function ToolItem({ name, status }: ToolItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-[15px] text-[#4a4a4a]">{name}</p>
      <div
        className={`rounded-full px-2.5 h-6 flex items-center w-fit ${status !== 'Delete' ? 'bg-[#E0EAFF] border border-[#9BB5FD]' : 'bg-[#FFEBED] border border-[#F1B5B7]'}`}
      >
        <span className="font-normal text-[12px] leading-none">{status}</span>
      </div>
    </div>
  );
}
export const DataHandling: React.FC<DataHandlingProps> = ({ selectOffboadingScope }) => {
  return (
    <section className="bg-white rounded-lg p-6 mb-6">
      <div className="flex flex-col gap-5">
         <div className="flex items-center justify-between">
        <h2 className="font-bold text-[19px] text-[#4a4a4a]">Data Handling Summary</h2>
        {selectOffboadingScope !== 'users' &&(
           <button className="flex items-center gap-0.5 h-5 text-[#4a4a4a] hover:text-[#333] transition-colors">
                                    <div className="w-5 h-5 relative">
                                      <div className="absolute inset-[12.62%_12.62%_12.5%_12.5%]">
                                        <svg
                                          className="absolute block inset-0"
                                          fill="none"
                                          preserveAspectRatio="none"
                                          viewBox="0 0 14.9757 14.9757"
                                        >
                                          <path d={svgPaths.p42c2a80} fill="currentColor" />
                                        </svg>
                                      </div>
                                    </div>
                                    <span className="font-medium text-[13px] tracking-[0.26px]">Edit</span>
           </button>
        )}
        </div>
        {selectOffboadingScope === 'users' && (
          <div className="bg-[#f6fdff] border border-[#b0deeb] rounded-lg p-3">
            <div className="flex gap-1.5">
              <div className="w-5 h-5 relative shrink-0">
                <div className="absolute inset-[8.33%]">
                  <svg
                    className="absolute block inset-0"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 16.6667 16.6667"
                  >
                    <path d={svgPaths.p36290900} fill="#006176" />
                  </svg>
                </div>
              </div>
              <p className="font-normal text-[14px] text-[#3b4648] leading-[19px]">
                No data handling actions are required for this request.
              </p>
            </div>
          </div>
        )}

        {selectOffboadingScope === 'project' && (
          <div>
            <div className="bg-[#f6fdff] border border-[#b0deeb] rounded-lg p-3">
              <div className="flex gap-1.5">
                <div className="w-5 h-5 relative shrink-0">
                  <div className="absolute inset-[8.33%]">
                    <svg
                      className="absolute block inset-0"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 16.6667 16.6667"
                    >
                      <path d={svgPaths.p36290900} fill="#006176" />
                    </svg>
                  </div>
                </div>
                <p className="font-normal text-[14px] text-[#3b4648] leading-[19px]">
                  Selected data handling actions will be executed once the requset is approved.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
              <ToolItem name="Teams Site" status="Archive" />
              <ToolItem name="Tool Builder" status="Delete" />
              <ToolItem name="Company Health Check" status="Archive" />
            </div>
          </div>
        )}

        {selectOffboadingScope === 'tools' && (
          <div>
            <div className="bg-[#f6fdff] border border-[#b0deeb] rounded-lg p-3">
              <div className="flex gap-1.5">
                <div className="w-5 h-5 relative shrink-0">
                  <div className="absolute inset-[8.33%]">
                    <svg
                      className="absolute block inset-0"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 16.6667 16.6667"
                    >
                      <path d={svgPaths.p36290900} fill="#006176" />
                    </svg>
                  </div>
                </div>
                <p className="font-normal text-[14px] text-[#3b4648] leading-[19px]">
                  Data handling actions will be executed only for offboarding tools after approval.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
              <ToolItem name="Teams Site" status="Archive" />
              <ToolItem name="Company Health Check" status="Archive" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
