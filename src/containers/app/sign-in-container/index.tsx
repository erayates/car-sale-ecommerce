"use client";

import PageHero from "@/components/page-hero";
import Link from "next/link";
import SignInForm from "./sign-in-form";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function SignInContainer() {
  const searchParams = useSearchParams();
  const emailChange = searchParams.get("emailChange");
  const registerSuccess = searchParams.get("registerSuccess");

  useEffect(() => {
    if (emailChange) {
      toast.info(
        "We sent an email to change your email. Please check your new email address that you entered."
      );
    }

    if (registerSuccess) {
      toast.success("You registered successfully.");
    }
  }, [emailChange, registerSuccess]);

  return (
    <>
      <PageHero title="Sign In" />
      <div className="bg-[#F2F2F2] container grid grid-cols-1 md:grid-cols-2 p-8 gap-8 md:gap-16 my-16">
        <div className="w-full h-full bg-dark-linear flex items-center justify-center p-4 md:p-0">
          <h3 className="font-bold text-5xl text-white ">carify.</h3>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-6 h-2 bg-orange-600"></div>
            <h3 className="text-3xl font-semibold uppercase">Login</h3>
            <div className="w-6 h-2 bg-orange-600"></div>
          </div>
          <p className="text-sm text-slate-500">
            Login to your account to show your account information and to add a
            new ad.
          </p>
          <p className="text-sm">
            Login or{" "}
            <Link
              href="/sign-up"
              className="text-blue-500 font-semibold underline"
            >
              Create an account?
            </Link>
          </p>

          <SignInForm />

          <Link
            href="/forgot-password"
            className="text-blue-500 font-semibold text-sm"
          >
            Reset Your Password by E-mail?
          </Link>
        </div>
      </div>
    </>
  );
}
