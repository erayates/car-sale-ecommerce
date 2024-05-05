"use client";

import { Input } from "@/components/ui/input";
import { SearchSchema } from "@/schemes/searchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormData } from "@/types/form";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const headers = {
  "X-RapidAPI-Key": "8eca1d2a66msh8c46c9a6b94076cp1d13f2jsn722a66acfb3c",
  "X-RapidAPI-Host": "car-data.p.rapidapi.com",
};

const fetcher = (url: string) =>
  fetch(url, { headers: headers }).then((res) => res.json());

export default function SearchFilter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(SearchSchema),
  });

  const [brand, setBrand] = useState<React.SetStateAction<string | null>>(null);

  const [models, setModels] =
    useState<React.SetStateAction<string | null>>(null);

  useEffect(() => {
    if (brand) {
      const getSeries = async () => {
        const response = await fetch(
          `https://car-data.p.rapidapi.com/cars?limit=50&page=0&make=${brand}`,
          {
            headers: {
              "X-RapidAPI-Key":
                "8eca1d2a66msh8c46c9a6b94076cp1d13f2jsn722a66acfb3c",
              "X-RapidAPI-Host": "car-data.p.rapidapi.com",
            },
          }
        );

        const data = await response.json();
        const models = data.map((item: any) => item.model);
        const uniqueModels = [...new Set(models)];
        setModels(uniqueModels);
      };
      getSeries();
    }
  }, [brand]);

  const {
    data: brands,
    error,
    isLoading,
  } = useSWR("https://car-data.p.rapidapi.com/cars/makes", fetcher);

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const onSubmit = async (data: FormData) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(data).map((prop: string[]) => {
      if (prop[1]) {
        params.set(prop[0], prop[1]);
      }
    });

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <aside>
      <div className="bg-dark-linear uppercase text-white p-4 font-semibold text-lg text-center">
        Filters
      </div>
      <div className="bg-[#F2F2F2] flex flex-col p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p>Brand:</p>
            <div className="grid grid-cols-2 gap-4">
              {isLoading ? (
                <CircularProgress />
              ) : (
                <select
                  name="brand"
                  className="border border-slate-200 p-4 rounded-md col-span-2"
                  {...register("brand")}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <option value="">Select a brand</option>

                  {brands?.map((brand: string, idx: number) => (
                    <option value={brand} key={idx}>
                      {brand}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p>Model:</p>
            <div className="grid grid-cols-2 gap-4">
              <select
                name="model"
                {...register("model")}
                className="border border-slate-200 p-4 rounded-md col-span-2"
              >
                <option value="">Select a brand</option>

                {brand &&
                  models?.map((model: string, idx: number) => (
                    <option value={model} key={idx}>
                      {model}
                    </option>
                  ))}
              </select>
            </div>
            {errors.model && (
              <p className="text-red-500 text-sm">{errors.model.message}</p>
            )}
          </div>

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
            <p>Mileage:</p>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="min. mileage"
                name="minMileage"
                register={register}
                error={errors.minKM}
              />
              <Input
                type="number"
                placeholder="max. mileage"
                name="maxMileage"
                register={register}
                error={errors.maxKM}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold py-4 rounded-md"
          >
            Search
          </button>
        </form>
      </div>
    </aside>
  );
}
