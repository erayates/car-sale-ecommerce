"use client";

import Link from "next/link";
import { MdSell, MdFavorite, MdSearch, MdStar } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";

import { auth } from "@/lib/firebase/auth";

import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import MobileNavigation from "./mobile-nav";
import { useState } from "react";

export default function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [openMobileNav, setOpenMobileNav] = useState(false);

  function onLogout() {
    signOut();
  }

  return (
    <>
      <header className="w-full flex flex-col z-20 relative mx-auto">
        <div className="bg-slate-900 w-full h-12 mx-auto"></div>
        <div className="container mx-auto flex items-center justify-between h-12 py-8">
          <div className="text-white font-bold text-3xl">
            <h1>carify.</h1>
          </div>
          <div className="hidden lg:block">
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
          <div className="flex gap-4 items-center">
            <Link
              href="/create-advert"
              className="bg-amber-600 hover:bg-amber-700 transition-all py-1.5 px-4 rounded-lg text-white text-sm flex items-center gap-2"
            >
              <MdSell />{" "}
              <span className="hidden lg:inline-block">Sell Now!</span>
            </Link>

            <button className="text-white text-xl">
              <MdSearch />
            </button>

            <button
              className="block lg:hidden text-white text-xl font-bold"
              onClick={() => setOpenMobileNav(true)}
            >
              <FaBars />
            </button>
            {!user ? (
              <Link
                href="/sign-in"
                className="text-white text-xl bg-blue-600 p-2 rounded-md"
              >
                <IoIosLogIn />
              </Link>
            ) : (
              <>
                <Link href="/account/favorites" className="text-white text-xl">
                  <MdFavorite />
                </Link>

                <Link href="/account" className="text-white">
                  <FaUser />
                </Link>
                <button
                  onClick={onLogout}
                  className="text-xl text-white bg-red-700 p-2 rounded-md"
                >
                  <IoIosLogOut className="text-xl" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      {openMobileNav && (
        <MobileNavigation setOpenMobileNav={setOpenMobileNav} />
      )}
    </>
  );
}
