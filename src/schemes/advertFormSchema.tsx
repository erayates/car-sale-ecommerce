import { z, ZodType } from "zod";
import { FormData } from "@/types/form";

export const AdvertFormSchema: ZodType<FormData> = z.object({
  title: z
    .string()
    .min(5, { message: "Title should be at least 50 characters." }),
  description: z
    .string()
    .min(50, { message: "Descripton should be at least 150 characters." }),

  city: z.string().trim().min(1, { message: "Required." }),
  addressLine: z.string().trim().min(1, { message: "Required." }),
  brand: z.string().trim().min(1, { message: "Required." }),
  model: z.string().trim().min(1, { message: "Required" }),
  gearbox: z.string().trim().min(1, { message: "Required" }),
  yearOfModel: z.string().trim().min(1, { message: "Required" }),
  engineSize: z.string().trim().min(1, { message: "Required" }),
  enginePower: z.string().trim().min(1, { message: "Required" }),
  carStatus: z.string().trim().min(1, { message: "Required" }),
  mileage: z.string().trim().min(1, { message: "Required" }),
  seller: z.string().trim().min(1, { message: "Required" }),
  fuelType: z.string().trim().min(1, { message: "Required" }),
  price: z.string().trim().min(1, { message: "Required" }),
  safety: z.array(z.string()).min(1, { message: "Required" }),
  interior: z.array(z.string()).min(1, { message: "Required" }),
  multimedia: z.array(z.string()).min(1, { message: "Required" }),
  photos: z.array(z.any()),
  color: z.string().trim().min(1, { message: "Required" }),
});
