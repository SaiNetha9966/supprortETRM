import { Info, ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';
import { Buttons } from './Buttons';

interface OptionGroup {
  label: string;
  options: { label: string; value: string }[];
}

interface DropdownProps {
  label: string;
  required?: boolean;
  hasInfo?: boolean;
  onChange?: (values: string[]) => void;
  selected: string[];
  setSelected: (values: string[]) => void;
  options: { label: string; value: string; category?: string }[];
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  required,
  hasInfo,
  onChange,
  selected,
  setSelected,
  options,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const groupedOptions: OptionGroup[] = options.reduce((acc: OptionGroup[], option) => {
    const groupLabel = option.category || 'Other';
    const existingGroup = acc.find((group) => group.label === groupLabel);
    const entry = { label: option.label, value: option.value };
    if (existingGroup) {
      existingGroup.options.push(entry);
    } else {
      acc.push({ label: groupLabel, options: [entry] });
    }
    return acc;
  }, []);

  const toggleSelect = (value: string) => {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setSelected(updated);
    onChange?.(updated);
  };

  const filteredGroups = groupedOptions.map((group) => ({
    ...group,
    options: group.options.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="flex flex-col gap-1.5 w-full relative font-['Roboto',sans-serif]">
      {/* Label */}
      <div className="flex items-center gap-1">
        <label className="font-medium text-[#4a4a4a] text-sm">{label}</label>
        {required && <span className="text-[#cb282e]">*</span>}
        {hasInfo && <Info className="w-4 h-4 text-[#4a4a4a]" />}
      </div>

      {/* Dropdown trigger */}
      <div
        className="border border-[#ccc] rounded px-2 py-1 bg-white cursor-pointer flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm text-[#878787]">
          {selected.length > 0 ? `${selected.length} selected` : 'Select tools'}
        </span>

        {!open ? (
          <ChevronDown className="w-4 h-4 text-[#4a4a4a]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#4a4a4a] rotate-180" />
        )}
      </div>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute z-10 mt-17 w-full border border-[#ccc] bg-white rounded shadow-lg p-2">
          {/* Search bar */}
          <div className="flex items-center gap-2 mb-2 border border-[#ccc] rounded px-2 py-1">
            <Search className="w-4 h-4 text-[#4a4a4a]" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full text-sm border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Select/Deselect All */}
          {/* Select/Deselect All */}
          <div className="flex justify-between mb-2 px-1">
            <button
              className="text-[11px] font-medium text-green-700"
              onClick={() => {
                const all = groupedOptions.flatMap((g) => g.options.map((o) => o.value));
                setSelected(all);
                onChange?.(all);
              }}
            >
              SELECT ALL
            </button>
            <button
              className="text-[11px] font-medium text-green-700"
              onClick={() => {
                setSelected([]);
                onChange?.([]);
              }}
            >
              DESELECT ALL
            </button>
          </div>

          {/* Divider */}
          <hr className="mb-2 border-t border-[#ccc]" />

          {/* Grouped options */}
          {filteredGroups.map((group) => (
            <div key={group.label} className="mb-2">
              <div className="text-xs font-semibold text-[#4a4a4a] mb-1">{group.label}</div>
              {group.options.map((opt) => (
                <div
                  key={opt.value}
                  className={`text-sm px-2 py-1 rounded cursor-pointer ${
                    selected.includes(opt.value)
                      ? 'bg-green-100 text-green-700'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => toggleSelect(opt.value)}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          ))}

          {/* Action buttons */}
          <div className="flex justify-between mt-2 px-1">
            <Buttons
              variant="secondary"
              onClick={() => {
                setSelected([]);
                onChange?.([]);
                setOpen(false);
              }}
            >
              Clear
            </Buttons>
            <Buttons
              variant="primary"
              onClick={() => {
                onChange?.(selected);
                setOpen(false);
              }}
            >
              Add
            </Buttons>
          </div>
        </div>
      )}
    </div>
  );
};
