import PageHero from "@/components/page-hero";
import AdvertGallery from "./advert-gallery";
import AdvertFeatures from "./advert-features";
import AdvertTabs from "./advert-tabs";
import AdvertOwnerInfo from "./advert-owner-info";
import { mockImages } from "@/lib/utils";
import AdvertFavorite from "./advert-favorite";
export default function AdvertDetailContainer({ advert }: { advert: any }) {
  return (
    <div className="relative">
      <PageHero title="Advert Detail" />
      <AdvertOwnerInfo advertOwnerId={advert.uid} />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 container mb-16 mt-8 relative">
        <AdvertGallery images={advert.images ?? mockImages} />
        <AdvertFeatures advert={advert} />
      </div>

      <div className="container flex  justify-end ">
        <AdvertFavorite advert={advert} />
      </div>
      <div className="container mb-16">
        <AdvertTabs advert={advert} />
      </div>
    </div>
  );
}
