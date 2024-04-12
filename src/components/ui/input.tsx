import { FormFieldProps } from "@/types/form";

export const Input: React.FC<FormFieldProps> = ({
  value,
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <div className="flex flex-col gap-2 ">
    <input
      type={type}
      className={`border border-slate-200 p-4 rounded-md`}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && <span className="text-red-700 text-sm">{error.message}</span>}
  </div>
);
