import { useState } from "react";
import ToolCard from "./ToolCard";
import ToolConfigForm from "./ToolConfigForm";
import svgPaths from "../../../imports/svg-7usnlwj5e7";

export default function ToolConfiguration() {
  const [selectedTools, setSelectedTools] = useState<string[]>([
    "Teams Site 1",
    "Tool Builder 1",
    "Teams Site 2",
    "Tool Builder 2",
  ]);
  const [newToolRequest, setNewToolRequest] = useState("");

  const toggleTool = (toolName: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolName)
        ? prev.filter((t) => t !== toolName)
        : [...prev, toolName]
    );
  };

  const handleAddToolRequest = () => {
    if (newToolRequest.trim()) {
      alert(`Tool request: ${newToolRequest}`);
      setNewToolRequest("");
    }
  };

  return (
    <div className="bg-[#f5f5f5] flex min-h-screen items-start justify-center p-3 sm:p-4 md:p-6">
      <div className="flex w-full max-w-[960px] flex-col gap-3 sm:gap-4 md:gap-5">
        {/* Main Content Card */}
        <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6">
          {/* Tools Selection */}
          <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <h2 className="text-[17px] sm:text-[18px] md:text-[19px] font-bold text-[#28292c]">
                Tools Selection
              </h2>
              <p className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#727272]">
                Choose from recommended tools based on your project type
              </p>

              {/* Success Banner */}
              <div className="bg-[#f1f6f0] border border-[#a5d192] rounded-lg p-3 flex items-center gap-[6px]">
                <svg
                  className="size-4 sm:size-5 shrink-0"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path d={svgPaths.p37293980} fill="#498E2B" />
                </svg>
                <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#3f702a]">
                  {selectedTools.length} Tools selected
                </p>
              </div>
            </div>

            {/* Recommended Tools */}
            <div className="bg-[#f7f7f7] rounded-lg p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:gap-5">
                <div>
                  <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold text-[#4a4a4a] mb-2">
                    Recommended Tools
                  </h3>
                  <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#4a4a4a]">
                    Playbook Engine: Recommended tools based on your project
                  </p>
                </div>

                {/* Tool Cards Grid - Responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <ToolCard
                    name="Teams Site 1"
                    platform="AlixPartner Platform"
                    isSelected={selectedTools.includes("Teams Site 1")}
                    onToggle={() => toggleTool("Teams Site 1")}
                  />
                  <ToolCard
                    name="Tool Builder 1"
                    platform="AlixPartner Platform"
                    isSelected={selectedTools.includes("Tool Builder 1")}
                    onToggle={() => toggleTool("Tool Builder 1")}
                  />
                  <ToolCard
                    name="Teams Site 2"
                    platform="AlixPartner Platform"
                    isSelected={selectedTools.includes("Teams Site 2")}
                    onToggle={() => toggleTool("Teams Site 2")}
                  />
                  <ToolCard
                    name="Tool Builder 2"
                    platform="AlixPartner Platform"
                    isSelected={selectedTools.includes("Tool Builder 2")}
                    onToggle={() => toggleTool("Tool Builder 2")}
                  />
                </div>
              </div>
            </div>

            {/* All Available Tools */}
            <div className="flex flex-col gap-4 sm:gap-5">
              <div>
                <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold text-[#4a4a4a] mb-2">
                  All Available Tools
                </h3>
                <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#4a4a4a]">
                  Select the tools you need for your projects
                </p>
              </div>

              <div className="border border-[#8dca7e] rounded-lg p-3 sm:p-4 flex items-center justify-center">
                <button className="flex items-center gap-[2px] text-[#4a4a4a] hover:opacity-70 transition-opacity">
                  <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p121ff280} fill="#4A4A4A" />
                  </svg>
                  <span className="text-[11px] sm:text-[12px] md:text-[13px] font-medium tracking-[0.26px]">
                    Add Tools
                  </span>
                </button>
              </div>
            </div>

            {/* Request New Tool */}
            <div className="flex flex-col gap-4 sm:gap-5">
              <div>
                <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold text-[#4a4a4a] mb-2">
                  Request New Tool
                </h3>
                <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#4a4a4a]">
                  Need something not listed? Specify additional tools here
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 items-stretch sm:items-center">
                <div className="flex-1 bg-white border border-[#ccc] rounded flex flex-col">
                  <textarea
                    value={newToolRequest}
                    onChange={(e) => setNewToolRequest(e.target.value)}
                    placeholder="Placeholder"
                    className="px-3 py-[6px] text-[12px] sm:text-[13px] md:text-[14px] text-[#4a4a4a] placeholder:text-[#878787] resize-none outline-none min-h-[60px]"
                    maxLength={80}
                  />
                  <div className="px-2 py-1 text-right">
                    <span className="text-[10px] sm:text-[11px] md:text-[12px] text-[#878787]">
                      {newToolRequest.length}/80
                    </span>
                  </div>
                  <div className="flex justify-end p-[2px]">
                    <svg className="size-3" fill="none" viewBox="0 0 12 12">
                      <path d={svgPaths.p1f40fc00} fill="#CCCCCC" />
                      <path d="M5 11H6.75L11 6.75V5L5 11Z" fill="#CCCCCC" />
                      <path d="M1 11H3L11 3V1L1 11Z" fill="#CCCCCC" />
                    </svg>
                  </div>
                </div>
                <button
                  onClick={handleAddToolRequest}
                  className="bg-[#498e2b] text-white text-[11px] sm:text-[12px] md:text-[13px] font-medium px-2 py-[6px] min-w-[78px] rounded hover:bg-[#3a7222] transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Specification Card */}
        <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6">
          <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <h2 className="text-[17px] sm:text-[18px] md:text-[19px] font-bold text-[#28292c]">
                Tools Specification
              </h2>
              <p className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#727272]">
                Configure platform-specific settings for selected tools
              </p>

              {/* Info Banner */}
              <div className="bg-[#f6fdff] border border-[#b0deeb] rounded-lg p-3 flex items-start gap-[6px]">
                <svg className="size-4 sm:size-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p29ef6f00} fill="#006176" />
                </svg>
                <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#3b4648]">
                  AlixPartners Platform Questions - Configure tool-specific
                  settings
                </p>
              </div>
            </div>

            {/* Tool Configuration Forms */}
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
              <ToolConfigForm
                toolName="Teams Site"
                platform="AlixPartner Platform"
              />
              <ToolConfigForm
                toolName="Tool Builder"
                platform="AlixPartner Platform"
              />
              <ToolConfigForm
                toolName="Tool Builder"
                platform="AlixPartner Platform"
              />
              <ToolConfigForm
                toolName="Tool Builder"
                platform="AlixPartner Platform"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}



