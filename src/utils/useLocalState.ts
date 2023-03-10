import { useState, useEffect } from "react";

export function useLocalState<S = undefined>(key: string, initial: S) {
  const [value, setValue] = useState<S>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const saved = window.localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return initial;
  });


  // Writing changes to local state -> this will then be used to set state from local state 

  useEffect(() => {
    if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue] as [typeof value, typeof setValue];
}