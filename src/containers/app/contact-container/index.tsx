import PageHero from "@/components/page-hero";
import ContactMap from "./contact-map";

import { IoLocationSharp } from "react-icons/io5";
import { GoClockFill } from "react-icons/go";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import ContactForm from "./contact-form";

const contacts = [
  {
    icon: <IoLocationSharp />,
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

export default function ContactContainer() {
  return (
    <>
      <PageHero title="Contact Us" />
      <ContactMap />
      <div className="bg-[#1F2B3E] container grid grid-cols-1 md:grid-cols-2 p-12 gap-12 mt-[-4rem] z-90 relative">
        <div className="text-white flex flex-col gap-4">
          <h3 className="text-3xl font-bold">carify.</h3>
          <p className="text-sm text-slate-400">
            Mauris dignissim condimentum viverra. Curabitur blandit eu justo id
            porta
          </p>
        </div>

        <div className="text-white flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Contact Details:</h3>
          {contacts.map((contact, idx) => (
            <div key={idx} className="flex items-center gap-3">
              {contact.icon}
              <p className="text-slate-400 text-sm">{contact.text}</p>
            </div>
          ))}
        </div>
      </div>

      <ContactForm />
    </>
  );
}
