import { z, ZodType } from "zod";
import { FormData } from "@/types/form";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

// Contact form schema
export const ContactFormSchema: ZodType<FormData> = z.object({
  firstName: z
    .string({
      required_error: "Required field.",
    })
    .min(1, { message: "Required field." }),
  lastName: z
    .string({ required_error: "Required field." })
    .min(1, { message: "Required field." }),
  email: z.string().email(),
  phone: z.string().min(11).max(14).regex(phoneRegex, "Invalid phone number."),
  content: z.string({ required_error: "Required field." }).min(50, {
    message: "Your message should be include at least 50 characters.",
  }),
});
