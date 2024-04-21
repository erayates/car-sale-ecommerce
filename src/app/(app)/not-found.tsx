import PageHero from "@/components/page-hero";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[90vh] w-full">
      <PageHero title="Oops! We are sorry :/" />
      <div className="w-full h-full flex flex-col items-center  mt-32">
        <h2 className="text-[120px] text-slate-700 font-semibold">404</h2>
        <p className="text-slate-700">
          We couldnt find the page that you try to find.
        </p>

        <Link href="/" className="px-4 py-2 text-sm bg-orange-600 font-semibold rounded-md mt-4 text-white">Go back to home!</Link>
      </div>
    </div>
  );
}
