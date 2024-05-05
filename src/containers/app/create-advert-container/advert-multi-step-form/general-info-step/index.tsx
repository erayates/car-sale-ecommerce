import { CircularProgress } from "@mui/material";
import useSWR from "swr";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

const headers = {
  "X-RapidAPI-Key": "8eca1d2a66msh8c46c9a6b94076cp1d13f2jsn722a66acfb3c",
  "X-RapidAPI-Host": "car-data.p.rapidapi.com",
};

const fetcher = (url: string) =>
  fetch(url, { headers: headers }).then((res) => res.json());

export default function GeneralInfoStep() {
  const [brand, setBrand] =
    React.useState<React.SetStateAction<string | null>>(null);

  const [models, setModels] =
    React.useState<React.SetStateAction<string | null>>(null);

  React.useEffect(() => {
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

  const { register } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-24">
      <div className="flex flex-col col-span-1 lg:col-span-2 gap-2">
        <h3 className="text-2xl">Advert Information:</h3>
        <p className="text-md text-blue-500">
          Each field is required in this step, so you need to fill all field.
          Otherwise, you will get error.
        </p>
        <div className="flex flex-col gap-2">
          <span>Title:</span>
          <Input
            type="text"
            name="title"
            placeholder="Enter an title"
            register={register}
            className="p-2 rounded-md border border-slate-200"
            error={undefined}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span>Description:</span>
          <Textarea
            rows={2}
            register={register}
            name="description"
            placeholder="Enter ad description"
            className="p-2 rounded-md border border-slate-200 resize-none"
            error={undefined}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span>City:</span>
          <Input
            type="text"
            name="city"
            placeholder="Enter the city (location) of the car"
            register={register}
            className="p-2 rounded-md border border-slate-200"
            error={undefined}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span>Adress Line:</span>
          <Textarea
            rows={1}
            register={register}
            name="addressLine"
            placeholder="Enter car location adress line"
            className="p-2 rounded-md border border-slate-200 resize-none"
            error={undefined}
          />
        </div>
      </div>

      <div className="flex flex-col col-span-1 lg:col-span-3 gap-2 w-full">
        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-2xl">Car Information:</h3>{" "}
          <div className="gap-12">
            <div className="space-y-2">
              <div className="grid grid-cols-3 items-center gap-2">
                <span>Brand: </span>

                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <select
                    name="brand"
                    className="border border-slate-200 p-2 rounded-md col-span-2"
                    defaultValue="default"
                    {...register("brand")}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    {brands?.map((brand: string, idx: number) => (
                      <option value={brand} key={idx}>
                        {brand}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              {brand && (
                <>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <span>Model:</span>
                    <select
                      name="model"
                      {...register("model")}
                      className="border border-slate-200 p-2 rounded-md col-span-2"
                    >
                      {models?.map((model: string, idx: number) => (
                        <option value={model} key={idx}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <span className="col-span-1">Fuel Type:</span>
                    <select
                      name="fuelType"
                      {...register("fuelType")}
                      className="border border-slate-200 p-2 rounded-md col-span-2"
                    >
                      <option value="Diesel">Diesel</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Petrol-LPG">Petrol & LPG</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Electrical">Electrical</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 items-center gap-2">
                    <span className="col-span-1">Gearbox:</span>
                    <select
                      name="gearbox"
                      {...register("gearbox")}
                      className="border border-slate-200 p-2 rounded-md col-span-2"
                    >
                      <option value="Automatic">Automatic</option>
                      <option value="Semi-automatic">Semi-automatic</option>
                      <option value="Manuel">Manuel</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 items-center gap-2">
                    <span>Year Of Model:</span>
                    <select
                      name="yearOfModel"
                      {...register("yearOfModel")}
                      className="border border-slate-200 p-2 rounded-md col-span-2"
                    >
                      {Array.from(
                        { length: 2024 - 1980 + 1 },
                        (_, index) => 1980 + index
                      ).map((year: number, idx: number) => (
                        <option key={idx} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-3 items-center gap-2">
                    <span>Engine Size:</span>
                    <Input
                      type="number"
                      name="engineSize"
                      register={register}
                      error={undefined}
                      className="border border-slate-200 p-2 rounded-md col-span-2"
                      placeholder="cc"
                    />
                  </div>

                  <div className="col-span-1 space-y-2">
                    <div className="grid grid-cols-3 items-center gap-2">
                      <span>Engine Power:</span>
                      <Input
                        type="number"
                        placeholder="hp"
                        name="enginePower"
                        register={register}
                        error={undefined}
                        className="p-2 border border-slate-200 rounded-md col-span-2"
                      />
                    </div>

                    <div className="grid grid-cols-3 items-center gap-2">
                      <span>Car Status:</span>
                      <select
                        defaultValue="Select a brand"
                        name="carStatus"
                        {...register("carStatus")}
                        className="border border-slate-200 p-2 rounded-md col-span-2"
                      >
                        <option value="Used">Used</option>
                        <option value="Brand-new">Brand-new</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-3 items-center gap-2">
                      <span>Mileage:</span>
                      <Input
                        type="number"
                        name="mileage"
                        error={undefined}
                        register={register}
                        placeholder="km"
                        className="p-2 border border-slate-200 rounded-md col-span-2"
                      />
                    </div>

                    <div className="grid grid-cols-3 items-center gap-2">
                      <span>Color:</span>
                      <Input
                        type="text"
                        name="color"
                        register={register}
                        error={undefined}
                        className="p-2 border border-slate-200 rounded-md col-span-2"
                      />
                    </div>

                    <div className="grid grid-cols-3 items-center gap-2">
                      <span>Seller:</span>
                      <select
                        name="seller"
                        {...register("seller")}
                        className="border border-slate-200 p-2 rounded-md col-span-2"
                      >
                        <option value="From-owner">From-owner</option>
                        <option value="Dealer">Dealer</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-3 items-center gap-2">
                      <span>Price:</span>
                      <Input
                        type="number"
                        register={register}
                        error={undefined}
                        name="price"
                        className="border border-slate-200 p-2 rounded-md col-span-2"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
