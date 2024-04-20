import { CheckboxProps } from "@/types/form";

export const Checkbox: React.FC<CheckboxProps> = ({
  value,
  name,
  register,
  className,
  setValue,
  getValues,
}) => {
  return (
    <>
      <input
        type="checkbox"
        {...register(name)}
        onChange={(e) => {
          if (e.target.checked) {
            if (!getValues(name)) {
              setValue(name, [e.target.value]);
            } else {
              setValue(name, [e.target.value, ...getValues(name)]);
            }
          }
        }}
        value={value}
        className={className}
      />
    </>
  );
};
