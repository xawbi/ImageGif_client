import {useEffect, useState} from "react";

export function useDebounce(value: string): string {
  const [debounce, setDebounce] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounce(value), 300)
    return () => clearTimeout(handler)
  }, [value])

  return debounce
}