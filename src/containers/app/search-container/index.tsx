import PageHero from "@/components/page-hero";
import SearchFilter from "./search-filter";
import SearchItems from "./search-items";

export default function SearchContainer({ items }: { items: any }) {
  return (
    <>
      <PageHero title="Find Your Dream Car" />
      <div className="container my-16 grid grid-cols-3 gap-12">
        <SearchFilter />
        <SearchItems />
      </div>
    </>
  );
}
