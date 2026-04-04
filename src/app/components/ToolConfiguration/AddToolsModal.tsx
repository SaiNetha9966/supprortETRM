import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { X, Info, CheckCircle2, Search } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ALL TOOLS');

  if (!isOpen) return null;

  const generateTabs = () => {
    const allToolsTab = ['ALL TOOLS'];
    const categories = data?.result?.tools
      ? [...new Set(data.result.tools.map((tool: any) => tool.Category))]
      : [];
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
    const matchesTab = activeTab === 'ALL TOOLS' || tool.Category === activeTab;
    return matchesSearch && matchesTab;
  });

  // Portal ensures modal overlays entire app
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-300 bg-opacity-70" onClick={onClose} />
      <div className="relative w-full max-w-[960px] mx-auto px-4 z-10">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden" style={{height: '540px', maxHeight: '90vh', display: 'flex', flexDirection: 'column'}}>
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-[#727272] hover:text-[#28292c] transition-colors z-20"
            aria-label="Close"
            onClick={onClose}
          >
            <X size={24} />
          </button>
          <div className="p-6 flex-1 overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col gap-2 mb-6">
              <h1 className="text-[19px] font-bold text-[#4a4a4a]">Add Tools</h1>
              <p className="text-[16px] text-[#727272] leading-[22px]">
                Select the tools you want to add to this request.
              </p>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <input
                type="text"
                placeholder="Search by tool name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[320px] h-8 px-3 pr-10 border border-[#ccc] rounded text-sm text-[#4a4a4a] placeholder:text-[#727272] focus:outline-none focus:border-[#498e2b]"
              />
              <span className="text-[15px] text-[#727272] ml-2">Filter by</span>
              <select className="border border-[#ccc] rounded px-2 text-[15px] text-[#727272] h-8">
                <option>Category</option>
                {/* Add more filter options if needed */}
              </select>
            </div>
            {/* Tool Groups */}
            <div className="bg-[#fafafa] border border-[#e0e0e0] rounded-lg overflow-hidden mb-6 p-4">
              {/* Group tools by category */}
              {['Most Requested', 'AP Platform'].map((group) => {
                const groupTools = filteredTools.filter((tool: any) => {
                  if (group === 'Most Requested') return tool.Recommended || tool.recommended || tool.default;
                  if (group === 'AP Platform') return !(tool.Recommended || tool.recommended || tool.default);
                  return false;
                });
                if (groupTools.length === 0) return null;
                return (
                  <div key={group} className="mb-4">
                    <div className="text-[14px] font-bold text-[#4a4a4a] mb-2">{group}</div>
                    {groupTools.map((tool: any) => {
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
                        <div key={tool.ToolId} className="flex items-center gap-2 mb-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => onToggleTool(tool.ToolId)}
                            disabled={isExisting}
                            className="w-5 h-5 accent-[#498e2b]"
                          />
                          <span className="text-[15px] text-[#4a4a4a] flex items-center gap-1">
                            {tool.ToolName}
                            <Info size={16} className="text-[#4a4a4a] shrink-0" />
                          </span>
                          {(tool.Recommended || tool.recommended || tool.default) && (
                            <span className="inline-block bg-[#eaf6fb] border border-[#9bb5fd] text-[#006176] rounded-full px-3 py-1 text-[13px]">Recommended</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            {/* Footer */}
            <div className="flex justify-end gap-4">
              <span className="text-[15px] text-[#4a4a4a] mr-auto">{totalSelectedCount} tools selected</span>
              <button
                onClick={onClose}
                className="h-8 px-4 min-w-[94px] border border-[#498E2B] text-[#498E2B] bg-white rounded hover:bg-[#f1f6f0] transition-colors text-[15px] font-medium"
              >
                Cancel
              </button>
              <button
                className="h-8 px-4 min-w-[94px] bg-[#498E2B] text-white rounded hover:bg-[#3f702a] transition-colors text-[15px] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={newlySelectedCount === 0}
                onClick={onClose}
              >
                Add
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
          ? 'bg-[#f5f5f5] border-[#ccc] cursor-not-allowed opacity-60'
          : isSelected
            ? 'bg-[#dff0db] border-[#498e2b]'
            : 'bg-white border-[#ccc] hover:border-[#498e2b]'
      }`}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="text-base font-medium text-[#4a4a4a] truncate">{tool?.ToolName}</h3>
            <Info size={16} className="text-[#4a4a4a] shrink-0" />
          </div>
          <p className="text-sm text-[#4a4a4a] mb-2">{tool?.Category}</p>
          {(tool?.Recommended || tool?.recommended || tool?.default) && (
            <span className="inline-block px-2.5 py-0.5 bg-[#f1f1f1] border border-[#ccc] rounded-full text-xs text-[#4a4a4a]">
              Recommended
            </span>
          )}
        </div>
        {isSelected && <CheckCircle2 size={24} className="text-[#498E2B] shrink-0" />}
      </div>
    </button>
  );
}
