import { useState, useEffect } from 'react';
import svgPaths from '../../../imports/svg-7usnlwj5e7';
import styles from './ToolConfigForm.module.css';

interface Question {
  QuestionLabel: string;
  QuestionValue: string;
  DataType: 'Select Box' | 'Single Line Text' | 'Label' | 'CheckBox' | string;
  Mandatory?: boolean;
  Options?: string[];
}

interface ToolConfigFormProps {
  toolId: string;
  toolName: string;
  platform: string;
  questions?: Question[];
  onChange: (field: string, value: any) => void;
  questionsinput?: any[]; // Pass from parent (formData.questionsinput)
}

export default function ToolConfigForm({
  toolId,
  toolName,
  platform,
  questions = [],
  onChange,
  questionsinput = [],
}: ToolConfigFormProps) {
  // Helper to get the latest value for a question from questionsinput
  const getPersistedValue = (q: Question) => {
    const entry = questionsinput.find((item: any) => Object.keys(item)[0] === q.QuestionValue);
    if (!entry) return undefined;
    const val = entry[q.QuestionValue];
    if (Array.isArray(val)) return val[0];
    return val;
  };

  const handleInputChange = (q: Question, value: string) => {
    onChange(q.QuestionValue, value);
  };

  const handleCheckboxChange = (q: Question, checked: boolean) => {
    onChange(q.QuestionValue, checked);
  };

  if (!questions || questions.length === 0) {
    return null;
  }

  // For rendering checkboxes under a label
  let lastLabel: string | null = null;

  return (
    <div className="border border-[#CCCCCC] rounded-lg p-4 sm:p-5 mb-2">
      <div className="flex flex-col gap-2 sm:gap-3">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold text-[#4a4a4a]">
            {toolName}
          </h4>
          <svg className="size-3 sm:size-4" fill="none" viewBox="0 0 16 16">
            <path d={svgPaths.p1ecaa900} fill="#4A4A4A" />
          </svg>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {(() => {
            const elements = [];
            let i = 0;
            while (i < questions.length) {
              const q = questions[i];
              if (q.DataType === 'Label') {
                elements.push(
                  <div key={q.QuestionValue} className={`flex flex-col gap-[6px] min-w-[180px] break-words ${styles.toolCheckbox}`}> 
                    <span className="font-semibold text-[14px] text-[#4a4a4a] mt-2 mb-1">
                      {q.QuestionLabel}
                    </span>
                  </div>
                );
                i++;
                continue;
              }
              if (q.DataType === 'CheckBox') {
                elements.push(
                  <div key={q.QuestionValue} className={`flex flex-col gap-[6px] min-w-[180px] break-words ${styles.toolCheckbox}`}>
                    <div className="flex items-center gap-2 ml-2">
                      <input
                        type="checkbox"
                        id={q.QuestionValue}
                        checked={!!getPersistedValue(q)}
                        onChange={e => handleCheckboxChange(q, e.target.checked)}
                      />
                      <label htmlFor={q.QuestionValue} className="text-[13px] text-[#4a4a4a]">
                        {q.QuestionLabel}
                      </label>
                    </div>
                  </div>
                );
                i++;
                continue;
              }
              if (q.DataType === 'Label') {
                elements.push(
                  <div key={q.QuestionValue} className="flex flex-col justify-center min-w-[180px] break-words">
                    <span className="text-[13px] text-[#4a4a4a] font-medium">
                      {q.QuestionLabel}
                    </span>
                  </div>
                );
                i++;
                continue;
              }
              if (q.DataType === 'CheckBox') {
                elements.push(
                  <div key={q.QuestionValue} className={`flex flex-col min-w-[180px] break-words ${styles.toolCheckbox}`}> 
                    <label className="flex items-center gap-2 text-[13px] text-[#4a4a4a] font-medium">
                      <input
                        type="checkbox"
                        checked={!!checkboxAnswers[q.QuestionValue]}
                        onChange={e => handleCheckboxChange(q, e.target.checked)}
                      />
                      {q.QuestionLabel}
                      {q.Mandatory && <span className="text-[#cb282e] ml-1">*</span>}
                    </label>
                  </div>
                );
                i++;
                continue;
              }
              if (q.DataType === 'Select Box') {
                elements.push(
                  <div key={q.QuestionValue} className="flex flex-col gap-[6px] min-w-[180px] break-words">
                    <label className="text-[13px] text-[#4a4a4a] font-medium">
                      {q.QuestionLabel}
                      {q.Mandatory && <span className="text-[#cb282e] ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <select
                        value={getPersistedValue(q) || ''}
                        onChange={e => handleInputChange(q, e.target.value)}
                        className="w-full h-[32px] bg-white border border-[#ccc] rounded px-2 text-[13px] text-[#878787] appearance-none pr-8 outline-none focus:border-[#498e2b] transition-colors"
                      >
                        <option value="">Select an option</option>
                        {q.Options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
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
                );
                i++;
                continue;
              }
              if (q.DataType === 'Date') {
                elements.push(
                  <div key={q.QuestionValue} className="flex flex-col gap-[6px] break-words">
                    <label className="text-[13px] text-[#4a4a4a] font-medium">
                      {q.QuestionLabel}
                      {q.Mandatory && <span className="text-[#cb282e] ml-1">*</span>}
                    </label>
                    <div style={{ height: 32, background: 'white', border: '1px solid #ccc', borderRadius: 4, padding: '0 8px', display: 'flex', alignItems: 'center' }}>
                      <input
                        type="date"
                        value={getPersistedValue(q) || ''}
                        onChange={e => handleInputChange(q, e.target.value)}
                        style={{ border: 'none', background: 'transparent', color: '#282926', cursor: 'pointer', minWidth: 0, fontSize: 14, fontFamily: 'Roboto, sans-serif', height: 28 }}
                        aria-label={q.QuestionLabel}
                      />
                    </div>
                  </div>
                );
                i++;
                continue;
              }
              if (q.DataType === 'Single Line Text') {
                elements.push(
                  <div key={q.QuestionValue} className="flex flex-col gap-[6px] min-w-[180px] break-words">
                    <label className="text-[13px] text-[#4a4a4a] font-medium">
                      {q.QuestionLabel}
                      {q.Mandatory && <span className="text-[#cb282e] ml-1">*</span>}
                    </label>
                    <input
                      type="text"
                        value={getPersistedValue(q) || ''}
                        onChange={e => handleInputChange(q, e.target.value)}
                      className="w-full h-[32px] bg-white border border-[#ccc] rounded px-2 text-[13px] text-[#878787] focus:outline-none focus:border-[#498e2b]"
                    />
                  </div>
                );
                i++;
                continue;
              }
              // fallback for unknown DataType
              i++;
            }
            return elements;
          })()}
        </div>
      </div>
    </div>
  );
}
