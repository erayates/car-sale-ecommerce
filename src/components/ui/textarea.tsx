import { FormFieldProps } from "@/types/form";
import { useState } from "react";

export const Textarea: React.FC<FormFieldProps> = ({
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  value,
  style,
}) => {
  const [textAreaValue, setTextAreValue] = useState<string>(value);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        className="border border-slate-200 p-4 rounded-md resize-none"
        style={style}
        placeholder={placeholder}
        rows={10}
        onChange={handleChange}
        {...register(name, { valueAsNumber })}
      />
      {error && (
        <span className="text-red-700 text-sm">{error.message.toString()}</span>
      )}
    </div>
  );
};
