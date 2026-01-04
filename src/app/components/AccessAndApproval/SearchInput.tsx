import { Search } from "lucide-react";

interface SearchInputProps {
    label: string;
    value: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ label, value, placeholder, required = false, onChange }) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="font-['Roboto',sans-serif] font-medium text-[#4a4a4a] text-sm">
                {label}
                {required && <span className="text-[#cb282e] ml-1">*</span>}
            </label>
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange?.(e.target.value)}
                    className="w-full h-8 px-2 pr-8 border border-[#ccc] rounded bg-white font-['Roboto',sans-serif] text-sm text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#498e2b] focus:border-transparent"
                />
                <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4a4a4a]" />
            </div>
        </div>
    );
}