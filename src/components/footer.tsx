import Link from "next/link";

import { IoLocationSharp } from "react-icons/io5";
import { GoClockFill } from "react-icons/go";
import { IoMdMail } from "react-icons/io";
import { FaPhone, FaLongArrowAltRight } from "react-icons/fa";

const contacts = [
  {
    icon: <IoLocationSharp className="text-5xl self-start mt-[-0.7rem]" />,
    text: "Unit 9, Manor Industrial Estate, Lower Wash Lane, Warrington, WA4",
  },
  {
    icon: <GoClockFill />,
    text: "8:00am - 9:30pm",
  },
  {
    icon: <IoMdMail />,
    text: "e.atees01@gmail.com",
  },
  {
    icon: <FaPhone />,
    text: "(206) 555-5555",
  },
];

const links = [
  {
    href: "/search",
    title: "Find a Car",
  },
  {
    href: "/faq",
    title: "FAQ",
  },
  {
    href: "/about-us",
    title: "About Us",
  },
  {
    href: "/contact",
    title: "Contact Us",
  },

  {
    href: "/help-center",
    title: "Help Center",
  },

  {
    href: "/privacy-policy",
    title: "Privacy Policy",
  },
];

export default function Footer() {
  return (
    <footer>
      <div className="bg-[#F2F2F2]">
        <div className="container py-24 grid grid-cols-4 gap-16">
          <div className="flex col-span-2 flex-col gap-6">
            <h1 className="font-bold text-3xl">carify.</h1>
            <p className="text-slate-400 text-md">
              Cras sit amet mi non orci pretium consectetur. Donec iaculis ante
              ac sollicitudin luctus. Phasellus ut lacus lacus. Phasellus
              sagittis ex id tortor tincidunt luctus. Donec consectetur
              consequat bibendum
            </p>
            <input type="text" className="outline-0 p-4 rounded-lg"></input>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold">Contact Us:</h3>
            {contacts.map((contact, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {contact.icon}
                <p className="text-slate-400 text-sm">{contact.text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold">Information:</h3>

            <ul className="flex flex-col gap-4">
              {links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-amber-500 transition-all flex gap-2 text-sm items-center"
                  >
                    <FaLongArrowAltRight /> {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#000C21] py-4">
        <div className="container text-white text-sm">
          <p>Copyright &#169; 2024. carify by devs.</p>
        </div>
      </div>
    </footer>
  );
}
