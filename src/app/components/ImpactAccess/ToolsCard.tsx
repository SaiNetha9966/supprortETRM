import svgPaths from "../../../imports/svg-ncq7ewl48m";

interface Tool {
  name: string;
  platform: string;
}
interface ToolsCardInterface{
  selectOffboadingScope:string;
}
export const  ToolsCard : React.FC<ToolsCardInterface> = ({selectOffboadingScope}) => {
  const tools: Tool[] = [
    { name: 'Teams Site', platform: 'AP Platform' },
    { name: 'Tool Builder', platform: 'AP Platform' },
    { name: 'Company Health Check', platform: 'AP Platform' },
  ];

  return (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[#4a4a4a] text-[19px] font-bold font-['Roboto',sans-serif]">
            {
              selectOffboadingScope === "users" ? "Tools" : "Tools Impacted"
            }
          </h2>
          <p className="text-[#727272] text-[16px] font-normal font-['Roboto',sans-serif]">
           All tools listed below will be offboarded once this request is approved.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {tools.map((tool, index) => (
            <div 
              key={index}
              className="bg-[#f7f7f7] border-2 border-[#ccc] rounded-lg p-4 flex flex-col gap-2"
            >
              <div className="flex items-center">
                <span className="text-[#878787] text-[16px] font-medium font-['Roboto',sans-serif] flex-1 truncate">
                  {tool.name}
                </span>
                <div className="w-4 h-4 flex-shrink-0">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 13.3333 13.3333">
                    <path d={svgPaths.p32f50700} fill="#878787" />
                  </svg>
                </div>
              </div>
              <p className="text-[#878787] text-[14px] font-normal font-['Roboto',sans-serif]">
                {tool.platform}
              </p>
              <div 
              style={{border:"1px solid #F1B5B7" , 
              borderRadius:"240px" , 
              backgroundColor:"#FFEBED" ,
               display:"flex" ,height:"20px",
               padding:"9px" ,alignItems:"center" , width:"120px"}}>
                <p style={{
                  color:"#BF494E",
                  fontFamily:"Roboto",
                  fontSize:"12px",
                  fontStyle:"normal",
                  fontWeight:"400",
                }}>Will Be Offboarded</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
