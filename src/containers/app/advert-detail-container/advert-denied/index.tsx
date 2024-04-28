import PageHero from "@/components/page-hero";
import Link from "next/link";

export default function AdvertDenied() {
  return (
    <div className="h-[90vh] w-full">
      <PageHero title="Ad Blocked" />
      <div className="container h-full flex flex-col items-center  mt-32">
        <h2 className="text-[96px] text-slate-700 font-semibold leading-none text-center">Ad Blocked</h2>
        <p className="text-slate-700 text-center">
          This ad was deemed unsuitable for display by our authorities or has
          been removed. Please contact for detailed information.
        </p>

        <Link
          href="/"
          className="px-4 py-2 text-sm bg-orange-600 font-semibold rounded-md mt-4 text-white"
        >
          Go back to home!
        </Link>
      </div>
    </div>
  );
}
