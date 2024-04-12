import { auth } from "@/lib/firebase/auth";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";

import Link from "next/link";
import { useEffect, useRef, Dispatch, SetStateAction } from "react";
import { RxCross2 } from "react-icons/rx";

export default function MobileNavigation({
  setOpenMobileNav,
}: {
  setOpenMobileNav: Dispatch<SetStateAction<boolean>>;
}) {
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  function onLogout() {
    signOut();
  }

  const navigationDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navigationDiv.current &&
        !navigationDiv.current.contains(event.target as Node)
      ) {
        setOpenMobileNav(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-screen h-full before:content-[''] bg-[rgba(0,0,0,0.5)] block lg:hidden fixed top-0 left-0 z-50 transition-all">
      <div
        className="bg-dark-linear h-full w-[70vw] md:w-[60vw] p-8 flex justify-between flex-col text-white font-semibold"
        ref={navigationDiv}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-5xl">carify.</h1>
            <p className="text-sm text-gray-400 md:text-xl mt-1">
              Your car safe with us.
            </p>
          </div>
          <button
            className="font-bold text-2xl bg-red-600 px-4 py-2 rounded-md"
            onClick={() => setOpenMobileNav(false)}
          >
            <RxCross2 />
          </button>
        </div>
        <ul className="text-3xl flex flex-col gap-2">
          <li className="hover:text-amber-500 transition-all">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-amber-500 transition-all">
            <Link href="/about-us">About Us</Link>
          </li>
          <li className="hover:text-amber-500 transition-all">
            <Link href="/search">Find Car</Link>
          </li>
          <li className="hover:text-amber-500 transition-all">
            <Link href="/contact">Contact Us</Link>
          </li>
          <li className="hover:text-amber-500 transition-all">
            <Link href="/faq">F.A.Q</Link>
          </li>
        </ul>

        {user ? (
          <button
            className="flex gap-2 bg-red-600 p-2 w-full rounded-md text-xl items-center"
            onClick={onLogout}
          >
            <IoIosLogOut /> Logout
          </button>
        ) : (
          <Link
            href="/sign-in"
            className="flex gap-2 bg-blue-600 p-2 w-full rounded-md text-xl items-center"
          >
            <IoIosLogIn /> Login
          </Link>
        )}
      </div>
    </div>
  );
}
