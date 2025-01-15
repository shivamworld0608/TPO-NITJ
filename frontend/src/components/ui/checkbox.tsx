// Checkbox.tsx
import React from "react";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", error, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type="checkbox"
          className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}`}
          ref={ref}
          {...props} // Passes down 'checked' and 'onChange'
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);


Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };