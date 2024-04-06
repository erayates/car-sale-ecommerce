import { FaHeadset } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

const contacts = [
  {
    icon: <FaPhoneAlt />,
    text: "01967 411232",
  },
  {
    icon: <FaPhoneAlt />,
    text: "+1 01 967 411 232",
  },
  {
    icon: <FaHeadset />,
    text: "helprotorscenter23@frs",
  },
  {
    icon: <FaHeadset />,
    text: "rotorsnumberchat@frs",
  },
];

export default function FAQSidebar() {
  return (
    <aside>
      <div className="bg-[#F6F6F6] p-8">
        <h3 className="text-xl font-semibold">Support Center</h3>
        <ul className="mt-4 flex flex-col gap-4">
          {contacts.map((contact, idx) => (
            <li key={idx} className="flex gap-2 text-sm items-center">
              {contact.icon}
              <p className="text-slate-400">{contact.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
