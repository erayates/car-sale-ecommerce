import { FaUser } from "react-icons/fa6";
import { FaSquarePhone } from "react-icons/fa6";
import { BiSolidMessageDots } from "react-icons/bi";

export default function AdvertOwnerInfo() {
  return (
    <div className=" bg-[#f2f2f2] p-4 rounded-md sticky top-[10px] container bg-dark-linear mt-16 z-40 flex justify-between items-center">
      <div>
        <p className="text-xl text-white font-semibold flex gap-2 items-center">
          <FaUser /> Eray Ateş
        </p>
        <p className="text-gray-400 text-sm">
          Account Creation Date: 24 Jun 2024
        </p>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="tel:8882192787"
          className="text-white bg-green-500 p-2 rounded-md flex text-md items-center gap-2"
        >
          <FaSquarePhone className="text-2xl" />
          <p className="font-semibold flex flex-col items-start  text-sm leading-4">
            Call Now!
            <span className="font-normal">888-219-2787</span>
          </p>
        </a>
        <button className="flex bg-blue-500 text-white p-2 rounded-md items-center gap-2">
          <BiSolidMessageDots className="text-2xl" />
          <p className="font-semibold flex flex-col items-start text-sm leading-4">
            Contact Now!
            <span className="font-normal">Send Message</span>
          </p>
        </button>
      </div>
    </div>
  );
}
