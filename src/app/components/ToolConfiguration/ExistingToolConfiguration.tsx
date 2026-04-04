import { useState, useEffect } from 'react';
import ToolCard from './ToolCard';
import ExistingToolsTable from './ExistingToolsTable';
import ToolConfigForm from './ToolConfigForm';
import AddToolsModal from './AddToolsModal';
import svgPaths from '../../../imports/svg-7usnlwj5e7';
import './ToolConfiguration.css';

interface Tool {
  Category: string;
  ToolId: string;
  ToolName: string;
  ToolTip?: string;
  Recommended?: boolean;
  Questions?: any[];
}

export default function ExistingToolConfiguration({
  data,
  existingProjectMetadata,
  existingToolFormData,
  setExistingToolFormData,
  isDraftProject,
}: {
  data?: any;
  existingProjectMetadata?: any;
  existingToolFormData: any;
  setExistingToolFormData: React.Dispatch<React.SetStateAction<any>>;
  isDraftProject: boolean;
}) {
  const allToolsFromApi: Tool[] = data?.result?.tools ?? [];
  const existingToolKeys: string[] = existingProjectMetadata?.result?.existingtools ?? [];

  const toSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const getToolName = (tool: any) => tool?.ToolName ?? tool?.Tool_name ?? tool?.name ?? '';
  const getToolCategory = (tool: any) => tool?.Category ?? tool?.category ?? tool?.platform ?? '';
  const isToolRecommended = (tool: any) =>
    Boolean(tool?.Recommended ?? tool?.recommended ?? tool?.default);

  const existingToolCards = existingToolKeys.map((key) => {
    const keySlug = toSlug(key);
    const match = allToolsFromApi.find((tool) => toSlug(tool?.ToolName ?? '') === keySlug);
    if (match) return match;
    return {
      ToolId: key,
      ToolName: key,
      Category: 'Existing Tool',
    };
  });
  const selectedTools: Tool[] = existingToolFormData?.selectedTools ?? [];
  const newToolRequest: string = existingToolFormData?.customToolRequest ?? '';
  const [showAddToolsModal, setShowAddToolsModal] = useState(false);

  const toggleTool = (toolId: string) => {
    setExistingToolFormData((prev: any) => {
      const prevSelectedTools = prev?.selectedTools ?? [];
      const isToolSelected = prevSelectedTools.some((tool: Tool) => tool.ToolId === toolId);

      if (isToolSelected) {
        return {
          ...prev,
          selectedTools: prevSelectedTools.filter((tool: Tool) => tool.ToolId !== toolId),
        };
      }

      const toolToAdd = allToolsFromApi.find(
        (tool) => tool.ToolId === toolId || (tool as any).id === toolId
      );
      if (!toolToAdd) return prev;

      return {
        ...prev,
        selectedTools: [
          ...prevSelectedTools,
          {
            Category: toolToAdd.Category,
            Recommended:
              toolToAdd.Recommended ?? false,
            ToolId: toolToAdd.ToolId,
            ToolName: toolToAdd.ToolName,
            ToolTip: toolToAdd.ToolTip || 'NA',
          },
        ],
      };
    });
  };

  const handleToolConfigChange = (toolId: string, field: string, value: any) => {
    setExistingToolFormData((prev: any) => {
      const prevSelectedTools = prev?.selectedTools ?? [];
      const prevSpecs = prev?.toolsSpecifications ?? [];
      const updatedSelectedTools = prevSelectedTools.map((tool: Tool) =>
        tool.ToolId === toolId ? { ...tool, [field]: value } : tool
      );

      const selectedTool = prevSelectedTools.find((tool: Tool) => tool.ToolId === toolId);
      const toolName = selectedTool?.ToolName || '';
      const updatedSpecs = prevSpecs.map((spec: any) =>
        spec.toolName === toolName ? { ...spec, [field]: value } : spec
      );

      if (!updatedSpecs.find((spec: any) => spec.toolName === toolName)) {
        updatedSpecs.push({
          toolName,
          trustExternalDomain: field === 'trustExternalDomain' ? value : '',
          externalDomainName: field === 'externalDomainName' ? value : '',
        });
      }

      return {
        ...prev,
        selectedTools: updatedSelectedTools,
        toolsSpecifications: updatedSpecs,
      };
    });
  };

  return (
    <div className="flex min-h-screen items-start justify-center rounded-[8px]">
      <div className="flex w-full max-w-[960px] flex-col gap-3 sm:gap-4 md:gap-5">

        <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6">
          <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
            <div className="flex flex-col gap-4 sm:gap-5">
              <div>
                <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold text-[#4a4a4a] mb-2">
                  Custom Tools
                </h3>
                <p className="text-[12px] sm:text-[13px] md:text-[16px] text-[#4a4a4a]">
                  Please provide list of Tools and their specifications that you will require for this Internal Project. Team will reach out to you if more information is required.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 items-stretch sm:items-center">
                <div className="flex-1 bg-white border border-[#ccc] rounded flex flex-col">
                  <textarea
                    style={{ minHeight: '10px' }}
                    value={newToolRequest}
                    onChange={(e) =>
                      setExistingToolFormData((prev: any) => ({
                        ...prev,
                        customToolRequest: e.target.value,
                      }))
                    }
                    className="px-3 py-[6px] text-[12px] sm:text-[13px] md:text-[14px] text-[#4a4a4a] placeholder:text-[#878787] resize-none outline-none min-h-[60px]"
                    maxLength={80}
                  />
                  <div className="px-2 py-1 text-right">
                    <span className="text-[10px] sm:text-[11px] md:text-[12px] text-[#878787]">
                      {newToolRequest.length}/80
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6">
          {/* Tools Selection */}
          <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <h2 className="text-[17px] sm:text-[18px] md:text-[19px] font-bold text-[#28292c]">
                Existing Tools
              </h2>
              <div className="flex flex-col gap-0">
                <p className="text-[16px] font-normal leading-[22px] tracking-[0%] text-[#727272]">
                  These tools are already configured for this ITRF.
                </p>

                <div className="info-alert">
                  <svg
                    className="alert-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <div className="flex flex-col">
                    <span>
                      Existing tools cannot be removed on this page. To remove a tool, submit an offboarding request after this ITRF is active.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Existing Tools Table - Figma style */}
            <div className="rounded-lg">
              <div className="flex flex-col gap-4 sm:gap-5">
                <ExistingToolsTable tools={existingToolCards} getToolName={getToolName} getToolCategory={getToolCategory} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6">
          {/* Tools Selection */}
          <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
            <div className="flex flex-col gap-4 sm:gap-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold text-[#4a4a4a] mb-2">
                    Selected Tools
                  </h3>
                  <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#727272]">
                    Select additional tools to include in this request.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddToolsModal(true)}
                  className="flex items-center gap-1 px-4 py-1 border border-[#498E2B] text-[#498E2B] rounded-lg hover:bg-[#f1f6f0] transition-colors text-[12px] sm:text-[13px] md:text-[14px] font-medium whitespace-nowrap flex-shrink-0"
                >
                  <svg className="size-4" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M10 3V17M3 10H17"
                      stroke="#498E2B"
                      strokeWidth="2"
                      strokeLinecap="square"
                    />
                  </svg>
                  Add Tools
                </button>
              </div>
            </div>
            {selectedTools.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-[#e0e0e0] rounded-lg">
                  <thead className="bg-[#fafafa]">
                    <tr>
                      <th className="px-4 py-3 text-left text-[#222] font-bold text-[15px] border-b border-[#e0e0e0]">Tool Name</th>
                      <th className="px-4 py-3 text-left text-[#222] font-bold text-[15px] border-b border-[#e0e0e0]">Category</th>
                      <th className="px-4 py-3 text-left text-[#222] font-bold text-[15px] border-b border-[#e0e0e0]">Type</th>
                      <th className="px-4 py-3 text-left text-[#222] font-bold text-[15px] border-b border-[#e0e0e0]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTools.map((tool, idx) => (
                      <tr key={tool.ToolId} className={idx % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'}>
                        <td className="px-4 py-3 border-b border-[#e0e0e0]">
                          <label className="toolCheckbox">
                            <input
                              type="checkbox"
                              checked={true}
                              onChange={() => toggleTool(tool.ToolId)}
                            />
                            <span className="font-medium text-[14px] text-[#4a4a4a] flex items-center">
                              {getToolName(tool)}
                            </span>
                          </label>
                        </td>
                        <td className="px-4 py-3 border-b border-[#e0e0e0] text-[14px] text-[#222]">{getToolCategory(tool)}</td>
                        <td className="px-4 py-3 border-b border-[#e0e0e0]">
                          {isToolRecommended(tool) && (
                            <span className="inline-block bg-[#eaf6fb] border border-[#9bb5fd] text-[#006176] rounded-full px-3 py-1 text-[13px]">Recommended</span>
                          )}
                        </td>
                        <td className="px-4 py-3 border-b border-[#e0e0e0]">
                          <span className="inline-block bg-[#fff7e6] border border-[#f9d250] text-[#b86a0f] rounded-full px-3 py-1 text-[13px]">Pending Specification</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
                Existing tool configurations are shown for reference only. No changes are required
                unless new tools are added.
              </p>

              {/* Info Banner */}
              <div className="bg-[#f6fdff] border border-[#b0deeb] rounded-lg p-3 flex items-start gap-[6px]">
                <svg className="size-4 sm:size-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p29ef6f00} fill="#006176" />
                </svg>
                <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#3b4648]">
                  No action is required unless new tools are added.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
              {selectedTools.map((tool: any) => {
                const fullTool = allToolsFromApi.find((t: any) => t.ToolId === tool.ToolId);
                const questions = fullTool?.Questions || [];
                const toolTip = fullTool?.ToolTip;
                if (!questions.length) return null;
                // ToolConfigForm already ensures Label is just a label, not a checkbox
                return (
                  <div key={tool.ToolId} className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[15px] sm:text-[16px] md:text-[17px] font-bold text-[#4a4a4a]">
                        {tool.ToolName}
                      </span>
                      {toolTip && toolTip !== 'NA' && (
                        <span className="group cursor-pointer">
                          <svg
                            className="inline size-4 align-middle text-[#498E2B]"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <circle cx="10" cy="10" r="9" stroke="#498E2B" strokeWidth="2" fill="#fff" />
                            <text x="10" y="15" textAnchor="middle" fontSize="12" fill="#498E2B" fontFamily="Arial" fontWeight="bold">i</text>
                          </svg>
                          <span className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 w-[320px] bg-[#222] text-white text-xs rounded px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-pre-line shadow-lg">
                            {toolTip}
                          </span>
                        </span>
                      )}
                    </div>
                    <ToolConfigForm
                      toolName={tool.ToolName}
                      toolId={tool.ToolId}
                      platform={tool.Category}
                      questions={questions}
                      onChange={(field: string, value: any) =>
                        handleToolConfigChange(tool.ToolId, field, value)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Add Tools Modal */}
        <AddToolsModal
          isOpen={showAddToolsModal}
          onClose={() => setShowAddToolsModal(false)}
          selectedTools={selectedTools}
          onToggleTool={toggleTool}
          data={data}
          existingToolKeys={existingToolKeys}
        />
      </div>
    </div>
  );
}
