import { CircularProgress } from "@mui/material";
import useSWR from "swr";

import * as React from "react";

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

  return (
    <div className="grid grid-cols-5 gap-24">
      <div className="flex flex-col col-span-2 gap-2">
        <h3 className="text-2xl">Advert Information:</h3>
        <div className="flex flex-col gap-2">
          <span>Title:</span>
          <input
            type="text"
            placeholder="Enter ad title"
            className="p-2 rounded-md border border-slate-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span>Description:</span>
          <textarea
            rows={10}
            placeholder="Enter ad description"
            className="p-2 rounded-md border border-slate-200 resize-none"
          />
        </div>
      </div>

      <div className="flex flex-col col-span-3 gap-2 w-full">
        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-2xl">Car Information:</h3>{" "}
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-2">
              <div className="grid grid-cols-3 items-center gap-2">
                <span>Brand: </span>

                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <select
                    name="brand"
                    className="border border-slate-200 p-2 rounded-md col-span-2"
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
                    <span>Models:</span>
                    <select
                      defaultValue="Select a brand"
                      name="brand"
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
                      defaultValue="Select a brand"
                      name="brand"
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
                      defaultValue="Select a brand"
                      name="brand"
                      className="border border-slate-200 p-2 rounded-md col-span-2"
                    >
                      <option value="Automatic">Automatic</option>
                      <option value="Manuel">Semi-automatic</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 items-center gap-2">
                    <span>Year Of Model:</span>
                    <select
                      defaultValue="Select a brand"
                      name="yearOfModel"
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
                    <input
                      type="number"
                      name="engineSize"
                      className="border border-slate-200 p-2 rounded-md col-span-2"
                      placeholder="cc"
                    />
                  </div>
                </>
              )}
            </div>
            {brand && (
              <div className="col-span-1 space-y-2">
                <div className="grid grid-cols-3 items-center gap-2">
                  <span>Engine Power:</span>
                  <input
                    type="number"
                    name="enginePower"
                    className="p-2 border border-slate-200 rounded-md col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <span>Car Status:</span>
                  <select
                    defaultValue="Select a brand"
                    name="carStatus"
                    className="border border-slate-200 p-2 rounded-md col-span-2"
                  >
                    <option value="Used">Used</option>
                    <option value="Brand-new">Brand-new</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <span>Mileage:</span>
                  <input
                    type="number"
                    name="mileage"
                    placeholder="km"
                    className="p-2 border border-slate-200 rounded-md col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <span>Color:</span>
                  <input
                    type="text"
                    name="color"
                    className="p-2 border border-slate-200 rounded-md col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <span>Seller:</span>
                  <select
                    defaultValue="Select a brand"
                    name="carStatus"
                    className="border border-slate-200 p-2 rounded-md col-span-2"
                  >
                    <option value="From-owner">From-owner</option>
                    <option value="Dealer">Dealer</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <span>Price:</span>
                  <input
                    type="number"
                    name="mileage"
                    className="border border-slate-200 p-2 rounded-md col-span-2"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
