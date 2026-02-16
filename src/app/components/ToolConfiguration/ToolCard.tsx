import React from "react";
import svgPaths from "../../../imports/svg-7usnlwj5e7";
import { X, Info, CheckCircle2, Search } from "lucide-react";

interface ToolCardProps {
  name: string;
  category: string;
  isSelected: boolean;
  onToggle: () => void;
  disabled?: boolean;
  isRecommended?: boolean;
}

export default function ToolCard({ name, category, isSelected, onToggle, disabled = false, isRecommended = false }: ToolCardProps) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`p-3 sm:p-4 rounded-lg border-2 flex items-start gap-2 sm:gap-3 text-left transition-all w-full ${disabled
        ? "bg-[#f5f5f5] border-[#ccc] cursor-not-allowed opacity-60"
        : isSelected
        ? "bg-[#dff0db] border-[#498e2b]"
        : "bg-white border-gray-300 hover:border-[#498e2b]"
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 mb-1.5">
          <h3 className="text-base font-medium text-[#4a4a4a] truncate" title={name}>
            {name}
          </h3>
          <Info size={16} className="text-[#4a4a4a] shrink-0" />
        </div>
        <p className="text-sm text-[#4a4a4a] mb-2">{category}</p>
        {isRecommended && (
          <span className="inline-block px-2.5 py-0.5 bg-[#f1f1f1] border border-[#ccc] rounded-full text-xs text-[#4a4a4a]">
            Recommended
          </span>
        )}
      </div>
      {isSelected && (
        <CheckCircle2
          size={24}
          className={`${disabled ? "text-[#bdbdbd]" : "text-[#498E2B]"} shrink-0`}
        />
      )}
    </button>
  );
}