import { IoAnalyticsOutline } from "react-icons/io5";
import { RiUser3Fill } from "react-icons/ri";
import { IoMdCart } from "react-icons/io";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { RiAdvertisementFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";


// ----------------------------------------------------------------------

const navConfig = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <IoAnalyticsOutline className="w-6 h-6"/>,
  },
  {
    title: "Users",
    path: "/dashboard/users",
    icon: <RiUser3Fill className="w-6 h-6" />,
  },
  {
    title: "Adverts",
    path: "/dashboard/adverts",
    icon: <RiAdvertisementFill className="w-5 h-5"/>,
  },
  {
    title: "Messages",
    path: "/dashboard/messages",
    icon: <BiSolidMessageSquareDetail className="w-5 h-5"/>,
  },
  {
    title: "Settings",
    path: "/dashboard/adverts",
    icon: <IoMdSettings className="w-5 h-5"/>,
  },
];

export default navConfig;
