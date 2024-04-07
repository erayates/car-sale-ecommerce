import PageHero from "@/components/page-hero";
import Link from "next/link";

export default function SignInContainer() {
  return (
    <>
      <PageHero title="Sign In" />
      <div className="bg-[#F2F2F2] container grid grid-cols-2 p-8 gap-16">
        <div className="w-full h-full bg-dark-linear flex items-center justify-center">
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
            <Link href="/sign-up" className="text-blue-500 font-semibold underline">
              Create an account?
            </Link>
          </p>
        </div>

        
      </div>
    </>
  );
}
