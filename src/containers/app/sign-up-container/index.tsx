import PageHero from "@/components/page-hero";
import Link from "next/link";
import SignUpForm from "./sign-up-form";

export default function SignUpContainer() {
  return (
    <>
      <PageHero title="Sign In" />
      <div className="bg-[#F2F2F2] container grid grid-cols-1 md:grid-cols-2 p-8 gap-8 md:gap-16 my-16">
        <div className="w-full h-full bg-dark-linear flex items-center p-4 md:p-0 justify-center">
          <h3 className="font-bold text-5xl text-white ">carify.</h3>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-6 h-2 bg-orange-600"></div>
            <h3 className="text-3xl font-semibold uppercase">Register</h3>
            <div className="w-6 h-2 bg-orange-600"></div>
          </div>
          <p className="text-sm text-slate-500">Create an account.</p>
          <p className="text-sm">
            Register or{" "}
            <Link
              href="/sign-in"
              className="text-blue-500 font-semibold underline"
            >
              Login to your account?
            </Link>
          </p>

          <SignUpForm />

          <p className="text-sm text-slate-500">
            Your personal data will be used in mapping with the vehicles you
            added to the website, to manage access to your account, and for
            other purposes described in our privacy policy.
          </p>
        </div>
      </div>
    </>
  );
}
