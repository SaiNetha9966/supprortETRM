import React, { useState } from "react";
import ReactDOM from "react-dom";
import { X, Info, CheckCircle2, Search } from "lucide-react";


interface AddToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTools: any[];
  onToggleTool: (toolId: string) => void;
  data?: any;
  existingToolKeys?: string[];
}

export default function AddToolsModal({
  isOpen,
  onClose,
  selectedTools,
  onToggleTool,
  data,
  existingToolKeys,
}: AddToolsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ALL TOOLS");

  if (!isOpen) return null;

  const generateTabs = () => {
    const allToolsTab = ["ALL TOOLS"];
    const categories = data?.result?.tools ? [...new Set(data.result.tools.map((tool: any) => tool.Category))] : [];
    return [...allToolsTab, ...categories];
  };

  const tabs = generateTabs();

  const toSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  // Filter tools using data from API
  const toolsToDisplay = data?.result?.tools || [];

  const toTitle = (value: string) =>
    value
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

  const existingToolSlugSet = new Set((existingToolKeys ?? []).map((key) => toSlug(key)));
  const missingExistingTools = (existingToolKeys ?? [])
    .map((key) => toSlug(key))
    .filter((key) => !toolsToDisplay.some((tool: any) => toSlug(tool?.ToolName ?? '') === key))
    .map((key) => ({
      ToolId: key,
      ToolName: toTitle(key),
      Category: 'Existing Tool',
    }));

  const toolsCatalog = [...toolsToDisplay, ...missingExistingTools];
  const existingToolIdSet = new Set(
    toolsCatalog
      .filter((tool: any) => existingToolSlugSet.has(toSlug(tool?.ToolName ?? '')))
      .map((tool: any) => tool.ToolId)
  );
  const existingCount = existingToolIdSet.size || existingToolSlugSet.size;
  const newlySelectedCount = selectedTools.filter((selectedTool: any) =>
    typeof selectedTool === 'string' ? !existingToolIdSet.has(selectedTool) : true
  ).length;
  const totalSelectedCount = existingCount + newlySelectedCount;
  const filteredTools = toolsCatalog.filter((tool: any) => {
    const matchesSearch = tool.ToolName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "ALL TOOLS" || tool.Category === activeTab;
    return matchesSearch && matchesTab;
  });

  // Portal ensures modal overlays entire app
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      {/* Overlay */}
      <div
       className="absolute inset-0 bg-gray-300 bg-opacity-70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[920px] mx-auto px-4 md:px-6 lg:px-0 z-10">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="text-lg md:text-[19px] font-bold text-[#28292c] mb-2">
                  Add Tools
                </h1>
                <p className="text-sm md:text-[15px] font-medium text-[#727272]">
                  Select one or more tools to add to this project.
                </p>
              </div>
              <button
                className="text-[#727272] hover:text-[#28292c] transition-colors ml-4"
                aria-label="Close"
                onClick={onClose}
              >
                <X size={24} />
              </button>
            </div>

            {/* Selection Banner */}
            {newlySelectedCount > 0 && (
              <div className="bg-[#f1f6f0] border border-[#a5d192] rounded-lg p-3 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-[#498E2B] shrink-0" />
                  <span className="text-sm text-[#3f702a] font-normal">
                    {newlySelectedCount} Tool
                    {newlySelectedCount !== 1 ? "s" : ""} selected
                  </span>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="border-b border-[#ccc] mb-5 overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2.5 text-xs md:text-sm font-medium uppercase whitespace-nowrap transition-colors ${
                      activeTab === tab
                        ? "text-[#498e2b] border-b-2 border-[#498e2b]"
                        : "text-[#4a4a4a] hover:text-[#498e2b]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="mb-5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tools by name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-8 px-3 pr-10 border border-[#ccc] rounded text-sm text-[#4a4a4a] placeholder:text-[#727272] focus:outline-none focus:border-[#498e2b]"
                />
                <Search
                  size={20}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#4a4a4a] pointer-events-none"
                />
              </div>
            </div>

            {/* Tool Cards */}
            <div className="h-[235px] overflow-y-auto overflow-x-hidden mb-8 pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filteredTools.map((tool: any) => {
                  const isExisting = existingToolSlugSet.has(toSlug(tool?.ToolName ?? ''));
                  const isSelected =
                    isExisting ||
                    selectedTools.some((selectedTool: any) => {
                      if (typeof selectedTool === 'string') {
                        return selectedTool === tool?.ToolId || selectedTool === tool?.ToolName;
                      }
                      return selectedTool?.ToolId === tool?.ToolId;
                    });

                  return (
                  <ToolCard
                    key={tool.ToolId}
                    tool={tool}
                    isSelected={isSelected}
                    onToggle={() => onToggleTool(tool.ToolId)}
                    disabled={isExisting}
                  />
                  );
                })}
              </div>
              {filteredTools.length === 0 && (
                <div className="flex items-center justify-center h-full text-[#727272]">
                  No tools found
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex gap-4 md:gap-8 justify-end">
              <button
                onClick={onClose}
                className="h-8 px-3 min-w-[94px] bg-[#878787] hover:bg-[#757575] text-white text-[15px] font-medium rounded transition-colors"
              >
                Cancel
              </button>
              <button
                className="h-8 px-3 min-w-[94px] bg-[#8dca7e] hover:bg-[#7ab96b] text-white text-[15px] font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={newlySelectedCount === 0}
                onClick={onClose}
              >
                Add Selected Tools
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// Tool Card Component
interface ToolCardProps {
  tool: any;
  isSelected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

function ToolCard({ tool, isSelected, onToggle, disabled = false }: ToolCardProps) {
  return (
    <button
      onClick={disabled ? undefined : onToggle}
      disabled={disabled}
      className={`relative rounded-lg border-2 p-4 text-left transition-all ${
        disabled
          ? "bg-[#f5f5f5] border-[#ccc] cursor-not-allowed opacity-60"
          : isSelected
          ? "bg-[#dff0db] border-[#498e2b]"
          : "bg-white border-[#ccc] hover:border-[#498e2b]"
      }`}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="text-base font-medium text-[#4a4a4a] truncate">
              {tool?.ToolName}
            </h3>
            <Info size={16} className="text-[#4a4a4a] shrink-0" />
          </div>
          <p className="text-sm text-[#4a4a4a] mb-2">{tool?.Category}</p>
          {(tool?.Recommended || tool?.recommended || tool?.default) && (
            <span className="inline-block px-2.5 py-0.5 bg-[#f1f1f1] border border-[#ccc] rounded-full text-xs text-[#4a4a4a]">
              Recommended
            </span>
          )}
        </div>
        {isSelected && (
          <CheckCircle2 size={24} className="text-[#498E2B] shrink-0" />
        )}
      </div>
    </button>
  );
}
