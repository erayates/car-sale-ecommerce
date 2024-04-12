import { CgArrowLongRight } from "react-icons/cg";

export default function Hero() {
  return (
    <>
      <div className="w-full h-[90vh] bg-hero-pattern bg-cover bg-no-repeat bg-center bg-fixed bg-blend-darken bg-[rgba(0,0,0,0.4)] flex items-center mt-[-6rem]">
        <div className="relative z-10 w-[80vw] flex flex-col gap-4 container">
          <h2 className="text-white text-[48px] md:text-[72px] font-bold">
            Your vehicle
            <br />
            <span className="text-amber-500 underline">safe</span> with us!
          </h2>
          <p className="text-white/50 italic text-sm md:text-md">
            Buy and sell car in the most trustworthy way.
          </p>
          <button className="text-white bg-amber-500 py-4 px-8 w-fit rounded-md text-sm font-semibold flex items-center gap-4 hover:scale-105 transition-all">
            Explore Right Now! <CgArrowLongRight className="text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
}
