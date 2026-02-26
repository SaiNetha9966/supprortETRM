import svgPaths from '../../../imports/svg-ncq7ewl48m';
import { useState } from 'react';

interface RemovalOptionsCardProps {
  onRemoveOptionChange: (value: string) => void;
  selectedOption: string;
}

export const RemovalOptionsCard: React.FC<RemovalOptionsCardProps> = ({
  onRemoveOptionChange,
  selectedOption,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <h2 className="text-[#4a4a4a] text-[19px] font-bold font-['Roboto',sans-serif]">
          What do you want to remove?
        </h2>

        {/* Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Remove Users Option */}
          <button
            onClick={() => onRemoveOptionChange('users')}
            className={`
              bg-white rounded-lg p-4 flex items-start gap-2 text-left border-2 transition-colors
              ${selectedOption === 'users' ? 'border-[#498e2b]' : 'border-[#ccc]'}
            `}
          >
            <div className="pt-0.5">
              {selectedOption === 'users' ? (
                <div className="w-4 h-4">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="7.5" fill="white" stroke="#498E2B" strokeWidth="1" />
                    <circle cx="8" cy="8" r="4" fill="#498E2B" />
                  </svg>
                </div>
              ) : (
                <div className="w-4 h-4">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="7.5" fill="white" stroke="#878787" strokeWidth="1" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <span className="text-[#4a4a4a] text-[16px] font-medium font-['Roboto',sans-serif]">
                Remove users from this project
              </span>
              <p className="text-[#4a4a4a] text-[14px] font-normal font-['Roboto',sans-serif]">
               Selected users will lose access to the entire project after approval.
              </p>
            </div>
          </button>

          {/* Remove Tool Access Option */}
          <button
            onClick={() => onRemoveOptionChange('tools')}
            className={`
              bg-white rounded-lg p-4 flex items-start gap-2 text-left border transition-colors
              ${selectedOption === 'tools' ? 'border-2 border-[#498e2b]' : 'border border-[#ccc]'}
            `}
          >
            <div className="pt-0.5">
              {selectedOption === 'tools' ? (
                <div className="w-4 h-4">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="7.5" fill="white" stroke="#498E2B" strokeWidth="1" />
                    <circle cx="8" cy="8" r="4" fill="#498E2B" />
                  </svg>
                </div>
              ) : (
                <div className="w-4 h-4">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="7.5" fill="white" stroke="#878787" strokeWidth="1" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <span className="text-[#4a4a4a] text-[16px] font-medium font-['Roboto',sans-serif]">
                Remove tool access for users
              </span>
              <p className="text-[#4a4a4a] text-[14px] font-normal font-['Roboto',sans-serif]">
                 Users stay in the project but lose some tool access after approval.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
