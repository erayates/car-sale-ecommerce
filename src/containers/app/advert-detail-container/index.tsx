import PageHero from "@/components/page-hero";
import AdvertGallery from "./advert-gallery";
import AdvertFeatures from "./advert-features";
import AdvertTabs from "./advert-tabs";
import AdvertOwnerInfo from "./advert-owner-info";
import { images } from "@/lib/utils";

export default function AdvertDetailContainer() {
  return (
    <div className="relative">
      <PageHero title="Advert Detail" />
      <AdvertOwnerInfo />

      <div className="grid grid-cols-5 gap-12 container mb-16 mt-8 relative">
        <AdvertGallery images={images} />
        <AdvertFeatures />
      </div>
      <div className="container mb-16">
        <AdvertTabs />
      </div>
    </div>
  );
}
