import { z, ZodType } from "zod";
import { FormData } from "@/types/form";

// Contact form schema
export const SignUpFormSchema: ZodType<FormData> = z
  .object({
    email: z.string().email(),
    firstName: z.string().min(1, { message: "Required field." }),
    lastName: z.string().min(1, { message: "Required field." }),
    password: z
      .string()
      .min(8, { message: "The password must be at least 8 characters long" })
      .max(32, { message: "The password must be at most 32 characters long" }),
    passwordConfirm: z.string(),
  })
  .refine((fields) => fields.password === fields.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords must match!",
  });
