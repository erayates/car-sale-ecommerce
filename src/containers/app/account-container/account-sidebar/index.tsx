"use client";

import { FaUser } from "react-icons/fa6";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoMegaphoneSharp } from "react-icons/io5";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { IoHeart } from "react-icons/io5";
import { FaUnlockAlt } from "react-icons/fa";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    href: "/account",
    title: "Profile",
    icon: <FaUser />,
  },

  {
    href: "/account/messages",
    title: "Messages",
    icon: <BiMessageSquareDetail />,
  },
  {
    href: "/account/my-adverts",
    title: "My Adverts",
    icon: <IoMegaphoneSharp />,
  },
  {
    href: "/account/favorites",
    title: "Favorites",
    icon: <IoHeart />,
  },
  {
    href: "/account/update-account",
    title: "Update Account",
    icon: <FaUnlockAlt />,
  },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  return (
    <aside className="bg-[#F2F2F2] p-8 md:sticky md:top-0 md:bottom-0 h-fit">
      <h3 className="font-semibold text-2xl">Account Details</h3>
      <nav className="flex justify-start md:justify-between flex-col h-full">
        <ul className="mt-6 flex flex-col gap-4  md:text-lg md:items-start">
          {sidebarItems.map((item, idx) => (
            <li
              key={idx}
              className={
                pathname === item.href
                  ? "text-orange-600"
                  : "text-slate-500 hover:text-orange-600"
              }
            >
              <Link
                href={item.href}
                className="flex gap-2 items-center text-md font-semibold"
              >
                {item.icon} {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <button className="text-red-700 font-bold text-lg uppercase py-2 px-4 mb-4 flex items-center gap-2 hover:text-white hover:bg-red-700 transition-all rounded-md mt-8 md:mt-48">
          Logout
          <MdOutlineArrowRightAlt className="text-3xl" />
        </button>
      </nav>
    </aside>
  );
}
