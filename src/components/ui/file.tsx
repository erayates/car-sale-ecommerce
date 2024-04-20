import { FileInputProps } from "@/types/form";
import { SlPicture } from "react-icons/sl";

export const FileInput: React.FC<FileInputProps> = ({
  name,
  register,
  multiple,
  onChange,
}) => {
  return (
    <div className="border-2 border-blue-200 border-dashed rounded-md h-[80%]">
      <label
        htmlFor={name}
        className="font-serif text-sm font-semibold text-blue-600 w-full h-full flex items-center justify-center gap-2 flex-col p-4 text-center"
      >
        <SlPicture className="text-6xl" />
        Upload your car photos... Click here!
      </label>
      <input
        type="file"
        className="hidden"
        name={name}
        id={name}
        multiple={multiple}
        {...(register(name),
        {
          onChange: (e) => onChange(e),
        })}
      />
    </div>
  );
};
