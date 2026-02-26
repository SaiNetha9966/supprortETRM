import React, { useState } from 'react';
import svgPaths from '../../../imports/svg-ncq7ewl48m';
import { OffboardingImpactTool } from '../Utils/UiUtilis';
import svgPathsAlert from '../../../imports/svg-m590sprq1z';

interface ToolsCardInterface {
  selectOffboadingScope: string;
  selectedOffBoardngImpactTools: string[];
  setSelectedOffBoardingImpactTools: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ToolsCard: React.FC<ToolsCardInterface> = ({
  selectOffboadingScope,
  selectedOffBoardngImpactTools,
  setSelectedOffBoardingImpactTools,
}) => {
  const tools: OffboardingImpactTool[] = [
    { name: 'Teams Site', platform: 'AP Platform' },
    { name: 'Tool Builder', platform: 'AP Platform' },
    { name: 'Company Health Check', platform: 'AP Platform' },
  ];

  const toggleToolSelection = (toolName: string) => {
    setSelectedOffBoardingImpactTools((prev) =>
      prev.includes(toolName) ? prev.filter((name) => name !== toolName) : [...prev, toolName]
    );
  };
  const AlertIcon: React.FC = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={svgPathsAlert.p341e8200} fill="#006176" />
    </svg>
  );

  return (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm mb-6">
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[#4a4a4a] text-[19px] font-bold font-['Roboto',sans-serif]">
            {selectOffboadingScope === 'users' ? 'Tools' : 'Tools Impacted'}
          </h2>
          <p className="text-[#727272] text-[16px] font-normal font-['Roboto',sans-serif]">
            All tools listed below will be offboarded once this request is approved.
          </p>
                  {
          selectOffboadingScope ===  'tools' && (
                <div className="info-alert-blue">
                  <AlertIcon />
                  <span>
                    Users will lose access only to the offboarded tools.
                  </span>
                </div>
          )
        }
        </div>


        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {tools.map((tool, index) => {
            const isSelected = selectedOffBoardngImpactTools.includes(tool.name);
            return (
              <div
                key={index}
                onClick={() => toggleToolSelection(tool.name)}
                className={`cursor-pointer rounded-lg p-4 flex flex-col gap-2 border-2 ${
                  isSelected ? 'bg-[#DFF0DB] border-[#498E2B]' : 'bg-[#f7f7f7] border-[#ccc]'
                }`}
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
                {selectOffboadingScope === 'project' && (
                  <div
                    style={{
                      border: '1px solid #F1B5B7',
                      borderRadius: '240px',
                      backgroundColor: '#FFEBED',
                      display: 'flex',
                      height: '20px',
                      padding: '9px',
                      alignItems: 'center',
                      width: '120px',
                    }}
                  >
                    <p
                      style={{
                        color: '#BF494E',
                        fontFamily: 'Roboto',
                        fontSize: '12px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                      }}
                    >
                      Will Be Offboarded
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
