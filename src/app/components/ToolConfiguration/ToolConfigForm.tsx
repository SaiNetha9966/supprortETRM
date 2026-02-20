import { useState } from 'react';
import svgPaths from '../../../imports/svg-7usnlwj5e7';

interface ToolConfigFormProps {
  toolId: string;
  toolName: string;
  platform: string;
  onChange: (field: string, value: any) => void;
}

export default function ToolConfigForm({
  toolId,
  toolName,
  platform,
  onChange,
}: ToolConfigFormProps) {
  const [trustDomain, setTrustDomain] = useState('');
  const [domainName, setDomainName] = useState('');

  const handleTrustDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTrustDomain(value);
    onChange('trustExternalDomain', value);
    if (value !== 'yes') {
      setDomainName('');
      onChange('externalDomainName', '');
    }
  };

  const handleDomainNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDomainName(value);
    onChange('externalDomainName', value);
  };

  return (
    <div className="border border-[#CCCCCC] rounded-lg p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold text-[#4a4a4a]">
              {toolName}
            </h4>
            <svg className="size-3 sm:size-4" fill="none" viewBox="0 0 16 16">
              <path d={svgPaths.p1ecaa900} fill="#4A4A4A" />
            </svg>
          </div>
          <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#4a4a4a]">{platform}</p>
        </div>
        <div className="flex gap-[32px]">
          {/* Trust external Domain */}
          <div className="flex flex-col gap-[6px] w-[269.33px]">
            <label className="flex items-center gap-1 text-[12px] sm:text-[13px] md:text-[14px] font-medium">
              <span className="text-[#4a4a4a]">Trust external Domain?</span>
              <span className="text-[#cb282e]">*</span>
            </label>
            <div className="relative">
              <select
                value={trustDomain}
                onChange={handleTrustDomainChange}
                className="w-full h-[32px] bg-white border border-[#ccc] rounded px-2 text-[12px] sm:text-[13px] md:text-[14px] text-[#878787] appearance-none pr-8 outline-none focus:border-[#498e2b] transition-colors"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <svg
                className="absolute right-2 top-1/2 -translate-y-1/2 size-3 sm:size-4 pointer-events-none"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path d={svgPaths.p15d61c00} fill="#4A4A4A" />
              </svg>
            </div>
          </div>

          {/* External Domain Name */}
          {trustDomain === 'yes' && (
            <div className="flex flex-col gap-[6px] w-[269.33px]">
              <label className="flex items-center gap-1 text-[12px] sm:text-[13px] md:text-[14px] font-medium">
                <span className="text-[#4a4a4a]">External Domain Name?</span>
                <span className="text-[#cb282e]">*</span>
              </label>
              <input
                type="text"
                value={domainName}
                onChange={handleDomainNameChange}
                className="w-full h-[32px] bg-white border border-[#ccc] rounded px-2 text-[12px] sm:text-[13px] md:text-[14px] text-[#878787] focus:outline-none focus:border-[#498e2b]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
