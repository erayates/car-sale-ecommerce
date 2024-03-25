import Link from "next/link";
import { MdSell, MdFavorite, MdSearch, MdStar } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";

export default function Header() {
  return (
    <header className="w-full flex flex-col z-20 relative mx-auto">
      <div className="bg-slate-900 w-full h-12 mx-auto"></div>
      <div className="container mx-auto flex items-center justify-between h-12 py-8">
        <div className="text-white font-bold text-3xl">
          <h1>carify.</h1>
        </div>
        <div>
          <ul className="flex gap-12 text-white items-center font-semibold">
            <li className="hover:text-amber-500 transition-all">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-amber-500 transition-all">
              <Link href="/about-us">About Us</Link>
            </li>
            <li className="hover:text-amber-500 transition-all">
              <Link href="/search" className="flex flex-col items-center">
                Find <MdStar className="mb-[-16px]" />
              </Link>
            </li>
            <li className="hover:text-amber-500 transition-all">
              <Link href="/contact">Contact Us</Link>
            </li>
            <li className="hover:text-amber-500 transition-all">
              <Link href="/faq">F.A.Q</Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-4">
          <button className="bg-amber-600 hover:bg-amber-700 transition-all py-1.5 px-4 rounded-lg text-white text-sm flex items-center gap-2">
            <MdSell /> Sell Now!
          </button>

          <button className="text-white text-xl">
            <MdSearch />
          </button>

          <button className="text-white text-xl">
            <MdFavorite />
          </button>

          <button className="text-white">
            <FaUser />
          </button>

          <button className="text-white text-xl font-bold">
            <HiBars3BottomRight />
          </button>
        </div>
      </div>
    </header>
  );
}
