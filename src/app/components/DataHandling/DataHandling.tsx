import svgPaths from '../../../imports/svg-rl9qnronrk';
import { useState } from 'react';

interface Tool {
  id: string;
  name: string;
  action: string;
  checked: boolean;
}

interface DataHandlingProps {
  selectOffboadingScope: string;
}

export const DataHandling: React.FC<DataHandlingProps> = ({ selectOffboadingScope }) => {
  const [allChecked, setAllChecked] = useState(false);
  const [tools, setTools] = useState<Tool[]>([
    { id: '1', name: 'Tools Site', action: '', checked: false },
    { id: '2', name: 'Tools Builders', action: '', checked: false },
    { id: '3', name: 'Company Health Check', action: '', checked: false },
  ]);

  const handleCheckAll = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    setTools(tools.map((tool) => ({ ...tool, checked: newChecked })));
  };

  const handleCheckTool = (id: string) => {
    setTools(tools.map((tool) => (tool.id === id ? { ...tool, checked: !tool.checked } : tool)));
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-2">
          <p className="font-['Roboto',sans-serif] font-bold text-[19px] text-[#4a4a4a] whitespace-pre-wrap">
            How should tool data be handled?
          </p>
          <p className="font-['Roboto',sans-serif] font-normal text-[16px] leading-[22px] text-[#727272] whitespace-pre-wrap">
            Choose how data should be handled for each offboarded tool.
          </p>
          <div
            className="flex justify-end"
            // style={{
            //   display:"flex",
            //   height: "32px",
            //   minWidth:"94pz",
            //   padding:"0,0,12px",
            //   justifyContent:"center",
            //   alignItems:"center",gap:"2px"
            // }}
          ></div>
        </div>

        <div className="bg-white border-b border-[#e7e7e7] overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-white border-b border-[#e7e7e7]">
                <th className="text-left px-2.5 py-4">
                  <div className="flex gap-2 items-center">
                    <div
                      className="cursor-pointer flex items-center justify-center"
                      style={{
                        borderRadius: '2px',
                        border: '1px solid #878787',
                        background: allChecked ? '#498e2b' : '#FFF',
                        width: '16px',
                        height: '16px',
                      }}
                      onClick={handleCheckAll}
                    >
                      {allChecked && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          {' '}
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{' '}
                        </svg>
                      )}
                    </div>
                    <p className="flex-1 font-['Roboto',sans-serif] font-medium text-[14px] leading-5 tracking-[0.25px] text-[#1a1a1a]">
                      Tool Name
                    </p>
                  </div>
                </th>
                <th className="text-left px-2.5 py-4">
                  <p className="font-['Roboto',sans-serif] font-medium text-[14px] leading-5 tracking-[0.25px] text-[#1a1a1a]">
                    Data Action
                  </p>
                </th>
                {/* {
                   selectOffboadingScope==="project" && (
 <th className="text-left px-2.5 py-4"> 
                  <p className="font-['Roboto',sans-serif] font-medium text-[14px] leading-5 tracking-[0.25px] text-[#1a1a1a]">
                    Additional Specification
                  </p>
                </th>
                   )
                } */}

                {/* <th className="text-right px-2.5 py-4">
                  <div className="flex justify-end">
                    <button className="bg-white border border-[#8dca7e] rounded-sm px-3 py-2 min-w-[94px] flex gap-0.5 items-center justify-center">
                      <p className="font-['Roboto',sans-serif] font-medium text-[15px] leading-[13px] tracking-[0.3px] text-[#8dca7e]">
                        Bulk Action
                      </p>
                      <div className="overflow-clip relative shrink-0 size-5">
                        <div className="-translate-x-1/2 absolute bottom-[29.17%] left-1/2 top-[33.33%]">
                          <svg
                            className="absolute block inset-0"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 12.1458 7.5"
                          >
                            <path d={svgPaths.p380d0e00} fill="#8DCA7E" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  </div>
                </th> */}
                <th className="text-left px-2.5 py-4">
                  <button className="bg-white border border-[#498E2B] rounded-sm px-3 py-2 min-w-[94px] flex items-center justify-center gap-1">
                    <p className="font-['Roboto',sans-serif] font-medium text-[15px] leading-[13px] tracking-[0.3px] text-[#498E2B]">
                      Bulk Action
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M14.6464 6.66699L10.0006 11.3026L5.35486 6.66699L3.92773 8.09412L10.0006 14.167L16.0735 8.09412L14.6464 6.66699Z"
                        fill="#498E2B"
                      />
                    </svg>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool.id} className="bg-white border-b border-[#e7e7e7]">
                  <td className="px-2.5 py-4">
                    <div className="flex gap-2 items-center">
                      <div
                        className="cursor-pointer flex items-center justify-center"
                        style={{
                          borderRadius: '2px',
                          border: '1px solid #878787',
                          background: tool.checked ? '#498e2b' : '#FFF',
                          width: '16px',
                          height: '16px',
                        }}
                        onClick={() => handleCheckTool(tool.id)}
                      >
                        {tool.checked && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M6.27172 10.5003L2.33398 6.70821L3.64625 5.44447L6.27172 7.97285L11.5208 2.91699L12.834 4.18073L6.27172 10.5003Z"
                              fill="white"
                            />
                          </svg>
                        )}
                      </div>

                      <p className="flex-1 font-['Roboto',sans-serif] font-normal text-[14px] leading-5 text-[#3b3b3b]">
                        {tool.name}
                      </p>
                    </div>
                  </td>

                  <td className="px-2.5 py-4">
                    <div className="relative w-60">
                      <select
                        className="bg-white border border-[#ccc] rounded px-2 py-1.5 w-full 
                 font-['Roboto',sans-serif] font-normal text-[14px] leading-[19px] 
                 text-[#28292c] appearance-none cursor-pointer"
                      >
                        <option>Select an action</option>
                        <option>Archive </option>
                        <option>Delete </option>
                        <option>Transfer </option>
                      </select>

                      {/* Custom down arrow */}
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-[#4a4a4a]" fill="none" viewBox="0 0 10 6">
                          <path d={svgPaths.p22e4ca80} fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  </td>

                  {/* 
                    {
                      selectOffboadingScope==="project" && (
                  <td className="px-2.5 py-4">
                    <div className="relative w-60">
                      <input
                        className="bg-white border border-[#ccc] rounded px-2 py-1.5 w-full font-['Roboto',sans-serif] font-normal text-[14px] leading-[19px] text-[#28292c] appearance-none cursor-pointer"
                        type="text"
                      />

                       <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="overflow-clip relative shrink-0 size-4">
                          <div className="-translate-x-1/2 absolute bottom-[29.17%] left-1/2 top-[33.33%]">
                            <svg
                              className="absolute block inset-0"
                              fill="none"
                              preserveAspectRatio="none"
                              viewBox="0 0 9.7166 6"
                            >
                              <path d={svgPaths.p22e4ca80} fill="#4A4A4A" />
                            </svg>
                          </div>
                        </div>
                      </div> 
                    </div>
                  </td>
                      )
                    } */}

                  <td className="px-2.5 py-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
