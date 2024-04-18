import { z, ZodType } from "zod";
import { FormData } from "@/types/form";

// Contact form schema
export const SearchSchema: ZodType<FormData> = z.object({
  minYear: z.string(),
  maxYear: z.string(),
  locationProvince: z.string(),
  minPrice: z.string(),
  maxPrice: z.string(),
  gearbox: z.string(),
  carStatus: z.string(),
  minKm: z.string(),
  maxKm: z.string(),
  bodyType: z.string(),
  color: z.string(),
});
