// Label.tsx
import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", children, required, ...props }, ref) => {
    return (
      <label
        className={`block text-sm font-medium text-gray-700 ${className}`}
        ref={ref}
        {...props}
      >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );
  }
);

Label.displayName = "Label";

export { Label };
export type { LabelProps };
