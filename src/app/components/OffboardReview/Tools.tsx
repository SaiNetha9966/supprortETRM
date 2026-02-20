import svgPaths from '../../../imports/svg-0ywn1y5h0h';

interface ToolItemProps {
  name: string;
  platform: string;
  status: string;
}

interface ToolsProps {
  selectOffboadingScope: string;
}
function ToolItem({ name, platform, status }: ToolItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-[15px] text-[#4a4a4a]">{name}</p>
      <p className="font-normal text-[15px] text-[#4a4a4a] leading-5">{platform}</p>
      <div className="bg-[#FFEBED] border border [#F1B5B7] rounded-full px-2.5 h-6 flex items-center w-fit">
        <span className="font-normal text-[12px] text-[] leading-none">{status}</span>
      </div>
    </div>
  );
}

export const Tools: React.FC<ToolsProps> = ({ selectOffboadingScope }) => {
  return (
    <section className="bg-white rounded-lg p-6 mb-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          {selectOffboadingScope === 'project' && (
            <h2 className="font-bold text-[19px] text-[#4a4a4a]">
              Tools Impacted (All tools will be offboarder)
            </h2>
          )}
          {selectOffboadingScope === 'tools' && (
            <h2 className="font-bold text-[19px] text-[#4a4a4a]">
              Tools Impacted (Selected tools only)
            </h2>
          )}
          {selectOffboadingScope === 'users' && (
            <h2 className="font-bold text-[19px] text-[#4a4a4a]">Tools</h2>
          )}
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
                  No tools will be offboarded as part of this request. All project tools will remain
                  active.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ToolItem name="Teams Site" platform="AP Platform" status="Tool Will Be Offboarded" />
          <ToolItem name="Tool Builder" platform="AP Platform" status="Tool Will Be Offboarded" />
          <ToolItem name="Company Health Check" platform="AP Platform" status="No Change" />
        </div>
      </div>
    </section>
  );
};
