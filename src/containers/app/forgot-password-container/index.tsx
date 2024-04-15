import PageHero from "@/components/page-hero";
import Link from "next/link";
import ForgotPasswordForm from "./forgot-password-form";

export default function ForgotPasswordContainer() {
  return (
    <>
      <PageHero title="Reset Password" />
      <div className="bg-[#F2F2F2] container grid grid-cols-2 p-8 gap-16 my-16">
        <div className="w-full h-full bg-dark-linear flex items-center justify-center">
          <h3 className="font-bold text-5xl text-white ">carify.</h3>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-6 h-2 bg-orange-600"></div>
            <h3 className="text-3xl font-semibold uppercase">Reset Password</h3>
            <div className="w-6 h-2 bg-orange-600"></div>
          </div>
          <p className="text-sm text-slate-500">
            Enter your email address to reset your password. A reset link will
            be send your email address.
          </p>

          <ForgotPasswordForm />

          <div className="flex gap-2 items-center">
            <Link
              href="/sign-in"
              className="text-blue-500 font-semibold text-sm hover:underline"
            >
              Login
            </Link>
            <span>or</span>
            <Link
              href="/sign-up"
              className="text-blue-500 font-semibold text-sm hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
