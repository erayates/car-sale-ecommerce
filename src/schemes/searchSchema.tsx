import { z, ZodType } from "zod";
import { FormData } from "@/types/form";

// Contact form schema
export const SearchSchema: ZodType<FormData> = z.object({
  minYear: z.string(),
  maxYear: z.string(),
  minPrice: z.string(),
  maxPrice: z.string(),
  minMileage: z.string(),
  maxMileage: z.string(),
  brand: z.string().min(1, { message: "You must select a brand." }),
  model: z.string().min(1, { message: "You must select a model." }),
});
