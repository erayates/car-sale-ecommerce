import { FormFieldProps } from "@/types/form";

export const Input: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  className,
}) => {
  return (
    <>
      <input
        type={type}
        className={className ? className : `border border-gray p-4 rounded-md`}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      />
      {error && <span className="text-red-700 text-sm">{error.message}</span>}
    </>
  );
};
