import { useState } from "react";

export type UseSearchResultReturn<T> = {
  results: Array<T>;
  count: number;
  setResults: (data: Array<T>, count: number) => void;
  clear: () => void;
};

export function useSearchResult<T>(): UseSearchResultReturn<T> {
  const [results, setSearchResults] = useState(Array<T>());
  const [count, setCount] = useState(0);

  const setResults = (data: Array<T>, totalCount: number) => {
    setSearchResults(data);
    setCount(totalCount);
  };

  const clear = () => {
    setSearchResults([]);
    setCount(0);
  };

  return { results, count, setResults, clear };
}
