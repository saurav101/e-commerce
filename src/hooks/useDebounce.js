import { useState, useEffect } from "react";

export function useDebounce(search, delay = 1000) {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const id = setTimeout(() => {
      console.log("callled");
      setDebouncedSearch(search);
    }, delay);
    return () => {
      console.log("clean up", search);
      clearTimeout(id);
    };
  }, [search, delay]);
  return debouncedSearch;
}
