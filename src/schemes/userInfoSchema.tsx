import { z, ZodType } from "zod";
import { FormData } from "@/types/form";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

// Contact form schema
export const UserInfoSchema: ZodType<FormData> = z.object({
  firstName: z.string().min(1, { message: "Required field." }),
  lastName: z.string().min(1, { message: "Required field." }),
  country: z.string().min(1, { message: "Required field." }),
  province: z.string().min(1, { message: "Required field." }),
  addressLine: z.string().min(1, { message: "Required field." }),
  phone: z.string().min(11).max(14).regex(phoneRegex, "Invalid phone number."),
});
