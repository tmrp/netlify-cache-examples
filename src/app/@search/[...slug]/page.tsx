import { ClearSearchForm } from "components/clear-search-from";
import { SearchForm } from "components/search-from";

export default function SearchPage() {
  return (
    <div className="container relative">
      <section className="flex flex-col gap-5">
        <ClearSearchForm />
        <SearchForm />
      </section>
    </div>
  );
}
