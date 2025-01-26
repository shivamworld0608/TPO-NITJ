import React, { useState } from "react";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  error?: string;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  checked: controlledChecked, 
  onChange, 
  error, 
  className = "" 
}) => {
  const [internalChecked, setInternalChecked] = useState(false);

  const isControlled = controlledChecked !== undefined;
  const checkedState = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    
    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked);
  };

  return (
    <div className="relative">
      <input
        type="checkbox"
        checked={checkedState}
        onChange={handleChange}
        className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500
          ${error ? "border-red-500" : "border-gray-300"}
          ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export { Checkbox };
export type { CheckboxProps };