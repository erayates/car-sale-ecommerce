import { Tooltip } from "@mui/material";

import { FaPlus } from "react-icons/fa";
import AdvertsList from "./adverts-list";
import { advertsList } from "@/mocks";

export const fetchAdvertsData = async () => {
  try {
    // Simulate asynchronous fetch
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return the data
    return advertsList;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching adverts data:", error);
    throw error;
  }
};

export default async function MyAdvertsContainer() {
  const adverts = await fetchAdvertsData();
  return (
    <div className="flex flex-col col-span-2 gap-1">
      <h3 className="text-3xl font-semibold">My Adverts:</h3>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2">
          <p className="text-slate-500">Your Total Advert: </p>
          <p className="font-semibold">12</p>
        </div>
        <Tooltip title="Create a New Advert">
          <div className="bg-orange-600 text-white p-4 rounded-lg">
            <button className="flex items-center justify-center">
              <FaPlus />
            </button>
          </div>
        </Tooltip>
      </div>

      <AdvertsList adverts={adverts} />
    </div>
  );
}
