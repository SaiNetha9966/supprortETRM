import React from 'react';
// Checkbox logic inlined below
import styles from '../ReviewAndSubmit/ReviewSubmit.module.css';

interface Tool {
  ToolId: string;
  ToolName: string;
  Category: string;
}

interface ExistingToolsTableProps {
  tools: Tool[];
  getToolName: (tool: Tool) => string;
  getToolCategory: (tool: Tool) => string;
}

const ExistingToolsTable: React.FC<ExistingToolsTableProps> = ({ tools, getToolName, getToolCategory }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full border border-[#dddddd] rounded-lg" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
      <thead className="bg-[#fff]">
        <tr>
          <th className="px-4 py-3 text-left text-[13px] font-bold text-[#4a4a4a] border-b border-[#dddddd]">Tool Name</th>
          <th className="px-4 py-3 text-left text-[13px] font-bold text-[#4a4a4a] border-b border-[#dddddd]">Category</th>
          <th className="px-4 py-3 text-left text-[13px] font-bold text-[#4a4a4a] border-b border-[#dddddd]">Type</th>
          <th className="px-4 py-3 text-left text-[13px] font-bold text-[#4a4a4a] border-b border-[#dddddd]">Status</th>
        </tr>
      </thead>
      <tbody>
        {tools.map((tool, idx) => (
          <tr
            key={tool.ToolId ?? tool.ToolName}
            className={idx % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-[#fff]'}
            style={{ borderBottom: '1px solid #dddddd' }}
          >
            <td className="px-4 py-3 text-[14px] text-[#4a4a4a] font-medium" style={{ borderBottom: '1px solid #dddddd' }}>
              <label className={styles.toolCheckbox} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" checked={true} readOnly />
                <span>{getToolName(tool)}</span>
              </label>
            </td>
            <td className="px-4 py-3 text-[14px] text-[#4a4a4a]" style={{ borderBottom: '1px solid #dddddd' }}>{getToolCategory(tool) || 'Most Requested'}</td>
            <td className="px-4 py-3" style={{ borderBottom: '1px solid #dddddd' }}>
              <span className="inline-block px-3 py-1 bg-[#eaf2ff] border border-[#9bb5fd] rounded-full text-[13px] text-[#1e486f]">Recommended</span>
            </td>
            <td className="px-4 py-3" style={{ borderBottom: '1px solid #dddddd' }}>
              <span className="inline-block px-3 py-1 bg-[#eaf7e7] border border-[#a5d192] rounded-full text-[13px] text-[#3e7c2c]">Ready</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ExistingToolsTable;
