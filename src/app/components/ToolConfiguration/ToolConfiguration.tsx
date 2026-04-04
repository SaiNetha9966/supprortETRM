import { useState, useEffect } from 'react';
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
  Questions?: any[];
  Questions?: any[];
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
  // Only show tools in selectedTools
  const selectedTools = formData.selectedTools;
  const uniqueTools = selectedTools;

  // ToolInfoIcon for info, matching AccessApproval
  const ToolInfoIcon: React.FC = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={svgIconPath.p341e8200} fill="#006176" />
    </svg>
  );
  useEffect(() => {
    if (!formData.selectedTools || formData.selectedTools.length === 0) {
      setFormData((prev: any) => ({
        ...prev,
        selectedTools: recommendedTools,
      }));
    }
  }, []);
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

      // --- Tool-based questionsinput logic ---
      // Collect all answers for tool-based questions in the format [{key: [value]}]
      let questionsinput = Array.isArray(prev.questionsinput) ? [...prev.questionsinput] : [];
      // Remove any previous entry for this tool's question key
      questionsinput = questionsinput.filter((entry: any) => !Object.keys(entry).includes(field));
      // Add new entry if value is not empty/null/undefined
      if (value !== undefined && value !== null && value !== "") {
        questionsinput.push({ [field]: [value] });
      }

      return {
        ...prev,
        selectedTools: prev.selectedTools.map((tool: any) =>
          tool.ToolId === toolId ? { ...tool, [field]: value } : tool
        ),
        toolsSpecifications: updatedSpecs,
        questionsinput,
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
    <div className="flex min-h-screen items-start justify-center">
      <div className="flex w-full max-w-[960px] flex-col gap-6">
        {/* Custom Tools Section */}
        <section className="bg-white border border-[#e0e0e0] rounded-lg p-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-[19px] font-bold text-[#4a4a4a]">Custom Tools</h3>
            <p className="text-[16px] text-[#727272] leading-[22px]">
              Please provide list of Tools and their specifications that you will require for this Internal Project. Team will reach out to you if more information is required.
            </p>
          </div>
          <div className="flex flex-col gap-6 mt-4">
            <div className="bg-white border border-[#ccc] rounded-[4px] flex flex-col w-full">
              <textarea
                value={formData.customToolRequest}
                onChange={(e) => handleChange('customToolRequest', e.target.value)}
                className="px-3 py-2 text-[14px] text-[#4a4a4a] placeholder:text-[#878787] resize-none outline-none min-h-[48px] w-full"
                maxLength={80}
              />
              <div className="px-2 py-1 text-right">
                <span className="text-[12px] text-[#878787]">
                  {formData.customToolRequest?.length || 0}/80
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Tools We Recommend Section */}
        <section className="bg-white border border-[#e0e0e0] rounded-lg p-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-[18px] font-bold text-[#28292c]">Tools We Recommend</h2>
            <p className="text-[15px] text-[#727272]">
              We've suggested tools based on your ITRF details. Feel free to deselect, add from the catalog, or request a custom tool and we'll reach out.
            </p>
          </div>
          <div className="rounded-lg mt-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-[16px] font-bold text-[#4a4a4a]">
                  Selected Tools
                </h3>
                <button
                  onClick={() => setShowAddToolsModal(true)}
                  className="flex items-center gap-1 px-4 py-2 border border-[#498E2B] text-[#498E2B] hover:bg-[#f1f6f0] transition-colors text-[13px] font-medium"
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
              <div className="overflow-x-auto mt-4">
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
                    {uniqueTools.map((tool: Tool, idx: number) => {
                      return (
                        <tr key={tool.ToolId} className={idx % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'}>
                          <td className="px-4 py-3 border-b border-[#e0e0e0]">
                            <label className="toolCheckbox">
                              <input
                                type="checkbox"
                                checked={true}
                                onChange={() => toggleTool(tool.ToolId)}
                              />
                              <span className="font-medium text-[14px] text-[#4a4a4a] flex items-center">
                                {tool.ToolName}
                                <span className="ml-1">
                                   <ToolInfoIcon />
                                </span>
                              </span>
                            </label>
                          </td>
                          <td className="px-4 py-3 border-b border-[#e0e0e0] text-[14px] text-[#222]">{tool.Category}</td>
                          <td className="px-4 py-3 border-b border-[#e0e0e0]">
                            {isToolRecommended(tool) && (
                              <span className="inline-block bg-[#eaf6fb] border border-[#9bb5fd] text-[#006176] rounded-full px-3 py-1 text-[13px]">Recommended</span>
                            )}
                          </td>
                          <td className="px-4 py-3 border-b border-[#e0e0e0]">
                            <span className="inline-block bg-[#fff7e6] border border-[#f9d250] text-[#b86a0f] rounded-full px-3 py-1 text-[13px]">Pending Specification</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Specification Section */}
        <section className="bg-white border border-[#e0e0e0] rounded-lg p-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-[18px] font-bold text-[#28292c]">Tools Specification</h2>
            <p className="text-[14px] font-medium text-[#727272]">
              Provide the required details below for tools that need extra set up information.
            </p>
            <div className="bg-[#f6fdff] border border-[#b0deeb] rounded-lg p-3 flex items-start gap-[6px]">
              <svg className="size-4 sm:size-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 20 20">
                <path d={svgPaths.p29ef6f00} fill="#006176" />
              </svg>
              <p className="text-[13px] text-[#3b4648]">
                Not all selected tools require configuration. Complete only the fields marked as required.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            {formData.selectedTools.map((tool: any) => {
              const fullTool = allTools.find((t: any) => t.ToolId === tool.ToolId);
              const questions = fullTool?.Questions || [];
              if (!questions.length) return null;
              return (
                <ToolConfigForm
                  key={tool.ToolId}
                  toolName={tool.ToolName}
                  toolId={tool.ToolId}
                  platform={tool.Category}
                  questions={questions}
                  onChange={(field: string, value: any) =>
                    handleToolConfigChange(tool.ToolId, field, value)
                  }
                  questionsinput={formData.questionsinput}
                />
              );
            })}
          </div>
        </section>
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
