import PageHero from "@/components/page-hero";
import Link from "next/link";

export default function AdvertPending() {
  return (
    <div className="h-[90vh] w-full">
      <PageHero title="Under Review" />
      <div className="container h-full flex flex-col items-center  mt-32">
        <h2 className="text-[96px] text-slate-700 font-semibold leading-none text-center">
          Under Review
        </h2>
        <p className="text-slate-700 text-center">
          The ad you are currently trying to view is under review by our
          officials. This process does not take approximately 24-48 hours. If it
          takes longer, please contact us. Thank you for your understanding.
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
