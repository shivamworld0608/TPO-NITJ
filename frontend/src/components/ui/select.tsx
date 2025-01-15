import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className = "", 
    options, 
    error, 
    placeholder = "Select an option", 
    value,
    onValueChange,
    ...props 
  }, ref) => {
    return (
      <div className="relative">
        <select
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}`}
          ref={ref}
          value={value}
          onChange={(e) => onValueChange?.(e.target.value)}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
export type { SelectProps, SelectOption };