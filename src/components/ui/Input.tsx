import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-dark mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-body">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-dark placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              icon ? "pl-10" : ""
            } ${error ? "border-red-500 focus:ring-red-500" : ""}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
