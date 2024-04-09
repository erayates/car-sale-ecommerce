"use client";

import { FaUser } from "react-icons/fa6";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoMegaphoneSharp } from "react-icons/io5";
import { MdOutlineArrowRightAlt } from "react-icons/md";



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
];

export default function AccountSidebar() {
  const pathname = usePathname();
  return (
    <aside className="bg-[#F2F2F2] p-8 sticky top-0 bottom-0 h-fit">
      <h3 className="font-semibold text-2xl text-center">Account Details</h3>
      <nav className="flex justify-between flex-col h-full">
        <ul className="mt-6 flex flex-col gap-4 ">
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
                className="flex gap-2 items-center text-lg font-semibold"
              >
                {item.icon} {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <button className="text-red-700 font-bold text-lg uppercase py-2 px-4 mb-4 flex items-center gap-2 hover:text-white hover:bg-red-700 transition-all rounded-md mt-48">
            Logout
            <MdOutlineArrowRightAlt className="text-3xl"/>
        </button>
      </nav>
    </aside>
  );
}
