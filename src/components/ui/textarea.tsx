import { FormFieldProps } from "@/types/form";

export const Textarea: React.FC<FormFieldProps> = ({
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <div className="flex flex-col gap-2">
    <textarea
      className="border border-slate-200 p-4 rounded-md resize-none"
      placeholder={placeholder}
      rows={10}
      {...register(name, { valueAsNumber })}
    />
    {error && <span className="text-red-700 text-sm">{error.message}</span>}
  </div>
);
