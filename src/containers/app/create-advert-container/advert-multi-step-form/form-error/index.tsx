import { Button } from "@mui/material";
import { BiSolidErrorAlt } from "react-icons/bi";

export default function FormError() {
  return (
    <div className="flex justify-center items-center flex-col mt-10 gap-2">
      <BiSolidErrorAlt className="text-red-600 text-5xl" />
      <div className="text-red-600 text-md text-center px-16">
        Your creating ad process failed. Make sure that the forms in the
        previous steps are filled out completely and correctly. You can try
        again after fix the errors.
      </div>
    </div>
  );
}
