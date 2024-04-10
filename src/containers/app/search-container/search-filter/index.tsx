"use client";

import { Input } from "@/components/ui/input";
import { SearchSchema } from "@/schemes/searchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormData } from "@/types/form";
import { z } from "zod";

export default function SearchFilter() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(SearchSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("success!", data);
  };

  return (
    <aside>
      <div className="bg-dark-linear uppercase text-white p-4 font-semibold text-lg text-center">
        Filters
      </div>
      <div className="bg-[#F2F2F2] flex flex-col p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p>Price:</p>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="min. price"
                name="minPrice"
                min={0}
                register={register}
                error={errors.minPrice}
              />
              <Input
                type="number"
                placeholder="max. price"
                name="maxPrice"
                register={register}
                error={errors.maxPrice}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p>Date of Model:</p>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="min. year"
                name="minYear"
                register={register}
                error={errors.minPrice}
              />
              <Input
                type="number"
                placeholder="max. year"
                name="maxYear"
                register={register}
                error={errors.maxPrice}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p>Gearbox:</p>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="checkbox"
                name="gearbox"
                value="Auto"
                register={register}
                error={errors.gearbox}
              />
              <Input
                type="checkbox"
                name="gearbox"
                value="Manuel"
                register={register}
                error={errors.gearbox}
              />
            </div>
          </div>

          <button type="submit">Search</button>
        </form>
      </div>
    </aside>
  );
}
