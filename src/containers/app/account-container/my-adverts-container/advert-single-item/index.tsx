import { convertNumberToCurrency } from "@/lib/utils";
import Image from "next/image";
import { FaCar } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useRef, useState, useEffect } from "react";

interface AdvertSingleItemProps {
  item: any;
  index: number;
}

const AdvertSingleItem: React.FC<AdvertSingleItemProps> = ({ item, index }) => {
  const [openActions, setOpenActions] = useState(false);
  const actionsDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionsDiv.current &&
        !actionsDiv.current.contains(event.target as Node)
      ) {
        setOpenActions(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onActionsButtonClick = () => {
    setOpenActions((openActions) => !openActions);
  };

  return (
    <div className="shadow-md w-full p-4 rounded-lg grid grid-cols-3 gap-6 relative">
      <div className="">
        <Image
          src={item.thumbnail}
          alt={item.title}
          width={192}
          height={192}
          className="rounded-lg"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <div className="flex justify-between gap-4">
          <h3 className="font-semibold">
            {item.title} {index}
          </h3>
          <div className="relative">
            <button className="text-slate-500" onClick={onActionsButtonClick}>
              <HiOutlineDotsVertical />
            </button>
            {openActions && (
              <div
                className="shadow-md absolute text-sm p-4 bg-white z-30 rounded-lg min-w-[140px] transition-all"
                ref={actionsDiv}
              >
                <ul className="flex flex-col gap-2">
                  <li className="cursor-pointer">Show Ad Page</li>
                  <li className="text-blue-500 cursor-pointer">Update Advert</li>
                  <li className="text-red-700 cursor-pointer">Delete Advert</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <FaCar />
          <p className="text-slate-500 text-sm"> Renault, Clio</p>
        </div>

        <div className="flex gap-2 items-center">
          <IoSpeedometerOutline />
          <p className="text-slate-500 text-sm">
            {convertNumberToCurrency(item.mileage)} km
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <FaCalendarAlt />
          <p className="text-slate-500 text-sm">{item.createdAt}</p>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 rounded-lg flex items-center">
        <p className="bg-orange-600 text-white font-semibold  px-4 py-2 rounded-br-lg rounded-tl-lg">
          ₺ {convertNumberToCurrency(780000)}
        </p>
      </div>
    </div>
  );
};

export default AdvertSingleItem;
