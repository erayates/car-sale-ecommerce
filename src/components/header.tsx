"use client";

import Link from "next/link";
import { MdSell, MdFavorite, MdSearch, MdStar } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";

import { auth } from "@/lib/firebase/auth";

import {
  useAuthState,
  useSignOut,
  useUpdateEmail,
} from "react-firebase-hooks/auth";
import MobileNavigation from "./mobile-nav";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/providers/userProvider";
import { UserType } from "@/types/user";
import { toast } from "react-toastify";

export default function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const router = useRouter();
  const currentUser = useUserStore((state) => state.currentUser as UserType);
  const fetchCurrentUser = useUserStore(
    (state) => state.fetchCurrentUser as (uid: string) => void
  );

  const [updateEmail, updateError] = useUpdateEmail(auth);

  const updateUserEmail = async () => {
    const isUpdated = await updateEmail(auth.currentUser.email);
    if (isUpdated) {
      const response = await fetch(`/api/v1/users/${currentUser.uid}`, {
        method: "PATCH",
        body: JSON.stringify({
          email: auth.currentUser.email,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok && response.status === 200) {
        toast.success("Your email updated successfully.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchCurrentUser(user.uid);
      if (auth.currentUser.email !== currentUser.email) {
        updateUserEmail();
      }
    }
  }, [user]);

  async function onLogout() {
    try {
      await signOut();
      const response = await fetch("/api/v1/logout", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Error signing out with email.", error);
    }
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
