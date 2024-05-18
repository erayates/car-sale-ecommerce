import { FormFieldProps } from "@/types/form";
import { useState } from "react";

export const Input: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  className,
  style,
  value,
}) => {
  const [inputValue, setInputValue] = useState<string>(value ?? "");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <input
        type={type}
        className={className ? className : `border border-gray p-4 rounded-md`}
        placeholder={placeholder}
        style={style}
        value={inputValue}
        {...register(name, { valueAsNumber })}
        onChange={handleChange}
      />
      {error && (
        <span className="text-red-700 text-sm">{error.message.toString()}</span>
      )}
    </>
  );
};
