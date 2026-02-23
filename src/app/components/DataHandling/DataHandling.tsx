import svgPaths from '../../../imports/svg-rl9qnronrk';
import { useState } from 'react';
import { DataHandlingTool } from '../Utils/UiUtilis';



interface DataHandlingProps {
  selectOffboadingScope: string;
  setDataHandlingTools:React.Dispatch<React.SetStateAction<DataHandlingTool[]>>;
  dataHandlingtools:DataHandlingTool[];
  toolsNameChecked:boolean;
  setToolNameChecked:React.Dispatch<React.SetStateAction<boolean>>;
}

export const DataHandling: React.FC<DataHandlingProps> = ({ selectOffboadingScope,dataHandlingtools,setDataHandlingTools,toolsNameChecked,setToolNameChecked }) => {

  // Toggle all checkboxes
  const handleCheckAll = () => {
    const newChecked = !toolsNameChecked;
    setToolNameChecked(newChecked);
    setDataHandlingTools((prev) => prev.map((tool) => ({ ...tool, checked: newChecked })));
  };

  // Toggle individual checkbox
  const handleCheckTool = (id: string) => {
    setDataHandlingTools((prev) =>
      prev.map((tool) =>
        tool.id === id ? { ...tool, checked: !tool.checked } : tool
      )
    );
  };

  // Capture selected action for each tool
  const handleActionChange = (id: string, action: string) => {
    setDataHandlingTools((prev) =>
      prev.map((tool) =>
        tool.id === id ? { ...tool, action } : tool
      )
    );
  };

  // Example: get all selected tools with their actions
  const selectedToolsWithActions = dataHandlingtools.filter((t) => t.checked && t.action);

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
                        background: toolsNameChecked ? '#498e2b' : '#FFF',
                        width: '16px',
                        height: '16px',
                      }}
                      onClick={handleCheckAll}
                    >
                      {toolsNameChecked && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
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
                <th className="text-left px-2.5 py-4">
                  <button className="bg-white border border-[#498E2B] rounded-sm px-3 py-2 min-w-[94px] flex items-center justify-center gap-1">
                    <p className="font-['Roboto',sans-serif] font-medium text-[15px] leading-[13px] tracking-[0.3px] text-[#498E2B]">
                      Bulk Action
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
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
              {dataHandlingtools.map((tool) => (
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none">
                            <path
                              d="M6.27172 10.5003L2.33398 6.70821L3.64625 5.44447L6.27172 7.97285L11.5208 2.91699L12.834 4.18073L6.27172 10.5003Z"
                              fill="white"
                            />
                          </svg>
                        )}
                      </div>
                      <p className="flex-1 font-['Roboto',sans-serif] text-[14px] text-[#3b3b3b]">
                        {tool.name}
                      </p>
                    </div>
                  </td>

                  <td className="px-2.5 py-4">
                    <div className="relative w-60">
                      <select
                        value={tool.action}
                        onChange={(e) => handleActionChange(tool.id, e.target.value)}
                        className="bg-white border border-[#ccc] rounded px-2 py-1.5 w-full 
                          font-['Roboto',sans-serif] text-[14px] text-[#28292c] appearance-none cursor-pointer"
                      >
                        <option value="">Select an action</option>
                        <option value="Archive">Archive</option>
                        <option value="Delete">Delete</option>
                        <option value="Transfer">Transfer</option>
                      </select>

                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-[#4a4a4a]" fill="none" viewBox="0 0 10 6">
                          <path d={svgPaths.p22e4ca80} fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  </td>
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
