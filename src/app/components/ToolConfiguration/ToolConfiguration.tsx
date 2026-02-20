import { useState } from 'react';
import ToolCard from './ToolCard';
import ToolConfigForm from './ToolConfigForm';
import AddToolsModal from './AddToolsModal';
import svgPaths from '../../../imports/svg-7usnlwj5e7';
import './ToolConfiguration.css';
import svgIconPath from '../../../imports/svg-m590sprq1z';
// Types
interface Tool {
  Category: string;
  ToolId: string;
  ToolName: string;
  ToolTip: string;
  Recommended: boolean;
}

interface ToolConfigurationProps {
  data?: any;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (field: string, value: any) => void;
}
export default function ToolConfiguration({
  data,
  formData,
  setFormData,
  handleChange,
}: ToolConfigurationProps) {
  const [newToolRequest, setNewToolRequest] = useState('');
  const [showAddToolsModal, setShowAddToolsModal] = useState(false);

  const allTools: Tool[] = data?.result?.tools || [];
  const isToolRecommended = (tool: any) =>
    Boolean(tool?.Recommended ?? tool?.recommended ?? tool?.default);
  const recommendedTools = allTools.filter((tool: Tool) => isToolRecommended(tool));
  const selectedTools = formData.selectedTools;
  const allSelctedTools = [...recommendedTools, ...selectedTools];
  const uniqueTools = Array.from(
    new Map(allSelctedTools.map((tool) => [tool.ToolId, tool])).values()
  );
  const toggleTool = (toolId: string) => {
    setFormData((prev: any) => {
      const isToolSelected = prev.selectedTools.some((tool: any) => tool.ToolId === toolId);

      if (isToolSelected) {
        // Remove tool
        return {
          ...prev,
          selectedTools: prev.selectedTools.filter((tool: any) => tool.ToolId !== toolId),
        };
      } else {
        // Add tool - get full object from allTools
        const toolToAdd = allTools.find(
          (tool: any) => tool.id === toolId || tool.ToolId === toolId
        );
        if (toolToAdd) {
          return {
            ...prev,
            selectedTools: [
              ...prev.selectedTools,
              {
                Category: toolToAdd.Category,
                Recommended: isToolRecommended(toolToAdd),
                ToolId: toolToAdd.ToolId,
                ToolName: toolToAdd.ToolName,
                ToolTip: toolToAdd.ToolTip || 'NA',
              },
            ],
          };
        }
        return prev;
      }
    });
  };

  const handleToolConfigChange = (toolId: string, field: string, value: any) => {
    setFormData((prev: any) => {
      const selectedTool = prev.selectedTools.find((tool: any) => tool.ToolId === toolId);
      const toolName = selectedTool?.ToolName || '';
      const updatedSpecs = prev.toolsSpecifications.map((spec: any) =>
        spec.toolName === toolName ? { ...spec, [field]: value } : spec
      );
      if (!updatedSpecs.find((spec: any) => spec.toolName === toolName)) {
        updatedSpecs.push({
          toolName: toolName,
          trustExternalDomain: field === 'trustExternalDomain' ? value : '',
          externalDomainName: field === 'externalDomainName' ? value : '',
        });
      }

      return {
        ...prev,
        selectedTools: prev.selectedTools.map((tool: any) =>
          tool.ToolId === toolId ? { ...tool, [field]: value } : tool
        ),
        toolsSpecifications: updatedSpecs,
      };
    });
  };

  const handleAddToolRequest = () => {
    if (newToolRequest.trim()) {
      alert(`Tool request: ${newToolRequest}`);
      setNewToolRequest('');
    }
  };

  const AlertIcon: React.FC = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={svgIconPath.p341e8200} fill="#006176" />
    </svg>
  );

  return (
    <div className="bg-white flex min-h-screen items-start justify-center p-3 sm:p-4 md:p-6 rounded-[8px]">
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
              <p className="text-[16px] font-normal leading-[22px] tracking-[0%] text-[#727272]">
                Based on your project details, the below tools are commonly used for similar
                projects. You may deselect tools you do not require or add more tools from the
                catalog.
              </p>

              <div className="info-alert">
                <AlertIcon />
                <span>Changes here may impact approvals and fulfillment timelines.</span>
              </div>
            </div>

            <div className="rounded-lg p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:gap-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold text-[#4a4a4a]">
                    Selected Tools for This Project ({formData.selectedTools.length})
                  </h3>
                  <button
                    onClick={() => setShowAddToolsModal(true)}
                    className="flex items-center gap-1 px-4 py-2 border border-[#498E2B] text-[#498E2B] hover:bg-[#f1f6f0] transition-colors text-[12px] sm:text-[13px] md:text-[14px] font-medium"
                    style={{ width: '152px', height: '32px' }}
                  >
                    <svg className="size-4" fill="none" viewBox="0 0 20 20">
                      <path
                        d="M10 3V17M3 10H17"
                        stroke="#498E2B"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Add More Tools
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {uniqueTools.map((tool: Tool) => {
                    const isSelected = formData.selectedTools.some(
                      (selected: any) => selected.ToolId === tool.ToolId
                    );
                    return (
                      <ToolCard
                        key={tool.ToolId}
                        name={tool.ToolName}
                        category={tool.Category}
                        isSelected={isSelected}
                        isRecommended={isToolRecommended(tool)}
                        onToggle={() => toggleTool(tool.ToolId)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:gap-5">
              <div>
                <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold text-[#4a4a4a] mb-2">
                  Custom Tool Request
                </h3>
                <p className="text-[12px] sm:text-[13px] md:text-[16px] text-[#4a4a4a]">
                  Use this section to request a tool which is not present in list of available tools
                  below, if no custom tool is required you may skip the section.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 items-stretch sm:items-center">
                <div className="flex-1 bg-white border border-[#ccc] rounded flex flex-col">
                  <textarea
                    style={{ minHeight: '10px' }}
                    value={formData.customToolRequest}
                    onChange={(e) => handleChange('customToolRequest', e.target.value)}
                    className="px-3 py-[6px] text-[12px] sm:text-[13px] md:text-[14px] text-[#4a4a4a] placeholder:text-[#878787] resize-none outline-none min-h-[60px]"
                    maxLength={80}
                  />
                  <div className="px-2 py-1 text-right">
                    <span className="text-[10px] sm:text-[11px] md:text-[12px] text-[#878787]">
                      {newToolRequest.length}/80
                    </span>
                  </div>
                </div>
                {/* <button
                  onClick={handleAddToolRequest}
                  className="bg-[#498e2b] text-white text-[11px] sm:text-[12px] md:text-[13px] font-medium px-2 py-[6px] min-w-[78px] rounded hover:bg-[#3a7222] transition-colors"
                >
                  Add
                </button> */}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6">
          <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-[17px] sm:text-[18px] md:text-[19px] font-bold text-[#28292c]">
                Tools Specification
              </h2>
              <p className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#727272]">
                Based on your project details, the tools below require configuration.Completely only
                the fields marked as required.
              </p>
              <div className="bg-[#f6fdff] border border-[#b0deeb] rounded-lg p-3 flex items-start gap-[6px]">
                <svg className="size-4 sm:size-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p29ef6f00} fill="#006176" />
                </svg>
                <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#3b4648]">
                  Not all selected tools require configuration. Complete only the fields marked as
                  required.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
              {formData.selectedTools.map((tool: Tool) => (
                <ToolConfigForm
                  key={tool.ToolId}
                  toolName={tool.ToolName}
                  toolId={tool.ToolId}
                  platform={tool.Category}
                  onChange={(field: string, value: any) =>
                    handleToolConfigChange(tool.ToolId, field, value)
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <AddToolsModal
          isOpen={showAddToolsModal}
          onClose={() => setShowAddToolsModal(false)}
          selectedTools={formData.selectedTools}
          onToggleTool={toggleTool}
          data={data}
        />
      </div>
    </div>
  );
}
