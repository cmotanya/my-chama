import type { AnyFieldApi } from "@tanstack/react-form";
import type { ComponentProps } from "react";
import { cn } from "../../lib/utils/cn";

interface TextFieldProps {
  field: AnyFieldApi;
  type: string;
  label: string;
  placeholder: string;
  inputMode?: ComponentProps<"input">["inputMode"];
  disabled?: boolean;
  showPassword?: boolean;
  numeric?: boolean;
  setShowPassword?: (value: boolean) => void;
}

export default function TextField({
  field,
  type,
  label,
  placeholder,
  inputMode,
  disabled = false,
  showPassword,
  numeric = false,
  setShowPassword,
}: TextFieldProps) {
  const errors = (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid
        ? field.state.meta.errors.map((err) => (
            <p
              key={err.message}
              className="text-error text-xs font-medium"
              role="alert"
            >
              {err.message}
            </p>
          ))
        : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={field.name}
        className="text-primary text-sm font-bold uppercase"
      >
        <span>{label}</span>
      </label>

      <div className="relative">
        <input
          id={field.name}
          name={field.name}
          type={type === "password" && showPassword ? "text" : type}
          inputMode={inputMode}
          value={numeric && field.state.value === 0 ? "" : field.state.value}
          onChange={(e) =>
            field.handleChange(
              numeric ? Number(e.target.value) : e.target.value,
            )
          }
          placeholder={placeholder}
          disabled={disabled}
          onBlur={field.handleBlur}
          aria-invalid={!field.state.meta.isValid && field.state.meta.isTouched}
          className={cn(
            "focus-visible:border-muted-foreground placeholder:text-muted-foreground/70 w-full rounded-2xl border py-3 ps-5",
            !field.state.meta.isValid && "border-error",
            field.state.meta.isTouched &&
              field.state.meta.isValid &&
              "border-success",
          )}
        />
        {setShowPassword && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide Password" : "Show Password"}
              className="text-[10px] font-bold uppercase"
            >
              {showPassword ? (
                <span className="text-error bg-error/15 rounded-md px-1 py-0.5">
                  Hide
                </span>
              ) : (
                <span className="text-success bg-success/15 rounded-md px-1 py-0.5">
                  Show
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      {errors}
    </div>
  );
}
