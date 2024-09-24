"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter({ filter: activeFilter }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filter = searchParams?.filter ?? "all";

  // could have got the activeFilter from params
  // activeFilter = searchParams.get ("capacity") ?? "all"

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All guests
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&ndash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&ndash;6 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        7&gt; guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  const buttonStyle =
    "px-5 py-2 hover:bg-primary-700  border-primary-700 border-solid border ";
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`${buttonStyle} ${
        filter === activeFilter ? "bg-primary-600" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Filter;
