import { Search, Info } from "lucide-react";

interface SearchInputProps {
    label: string;
    value: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (value: string) => void;
    tooltip?: string;
    disabled?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
    label,
    value,
    placeholder,
    required = false,
    onChange,
    tooltip,
    disabled = false,
}) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className={`flex items-center gap-1 font-['Roboto',sans-serif] font-medium text-sm relative group ${
                disabled ? 'text-[#999] opacity-60' : 'text-[#4a4a4a]'
            }`}>
                {label}
                {required && <span className="text-[#cb282e] ml-1">*</span>}

                {/* Info Icon */}
                <Info className={`w-4 h-4 ${disabled ? 'cursor-default' : 'cursor-pointer'} ${
                    disabled ? 'text-[#999]' : 'text-[#4a4a4a]'
                }`} />

                {/* Tooltip ABOVE the icon */}
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    {tooltip}
                </span>
            </label>

            <div className="relative">
                <input
                    type="text"
                    value={value}
                    disabled={disabled}
                    placeholder={placeholder}
                    onChange={(e) => onChange?.(e.target.value)}
                    className={`w-full h-8 px-2 pr-8 border border-[#ccc] rounded font-['Roboto',sans-serif] text-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#498e2b] focus:border-transparent ${
                        disabled 
                            ? 'bg-[#f5f5f5] cursor-not-allowed opacity-60' 
                            : 'bg-white'
                    }`}
                />
                <Search className={`absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    disabled ? 'text-[#999]' : 'text-[#4a4a4a]'
                }`} />
            </div>
        </div>
    );
};
