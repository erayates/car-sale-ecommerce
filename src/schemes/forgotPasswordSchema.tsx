import { z, ZodType } from "zod";
import { FormData } from "@/types/form";

// Contact form schema
export const ForgotPasswordSchema: ZodType<FormData> = z.object({
  email: z.string().email(),
});
