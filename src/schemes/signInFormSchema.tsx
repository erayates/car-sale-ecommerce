import { z, ZodType } from "zod";
import { FormData } from "@/types/form";

// Contact form schema
export const SignInFormSchema: ZodType<FormData> = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Please enter your password." }),
});
