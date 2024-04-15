import PageHero from "@/components/page-hero";
import FAQSidebar from "./faq-sidebar";
import FAQAccordion from "./faq-accordion";

export default function FAQContainer() {
  return (
    <>
      <PageHero title="FAQ" />
      <div className="container my-16 grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
        <FAQSidebar />

        <div className="col-span-2 flex flex-col gap-8 mt-8 lg:mt-0 px-4 lg:p-0">
          <h3 className="text-3xl font-semibold">
            Frenquently Asked Questions
          </h3>
          <p className="text-md text-base/6 text-slate-400">
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Pellentesque ipsum sapien, cursus eu
            scelerisque eget, scelerisque nec nulla. In turpis ex, congue ut
            scelerisque ut, euismod a turpis. Nunc metus purus, pretium ac nunc
            vitae, ultricies euismod magna. Interdum et malesuada fames ac ante
            ipsum primis in faucibus. Integer hendrerit, ipsum et tristique
            tincidunt, mauris eros tristique dolor, ut ornare turpis sapien at
            tellus
          </p>

          <FAQAccordion />

          <p className="text-md text-base/6 text-slate-400">
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Pellentesque ipsum sapien, cursus eu
            scelerisque eget, scelerisque nec nulla. In turpis ex, congue ut
            scelerisque ut, euismod a turpis. Nunc metus purus, pretium ac nunc
            vitae, ultricies euismod magna. Interdum et malesuada fames ac ante
            ipsum primis in faucibus. Integer hendrerit, ipsum et tristique
            tincidunt, mauris eros tristique dolor, ut ornare turpis sapien at
            tellus
          </p>
        </div>
      </div>
    </>
  );
}
