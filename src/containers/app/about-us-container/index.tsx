import PageHero from "@/components/page-hero";
import WhyUs from "../home-container/why-us";
import AboutUsPromo from "./promo";
import Testimonial from "../home-container/testimonial";

export default function AboutUsContainer() {
  return (
    <>
      <PageHero title="About Us" />
      <WhyUs color="light" />
      <AboutUsPromo />
      <Testimonial />
    </>
  );
}
