"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSearchStore } from "@/store/useSearchStore";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

export default function FilterBar() {
 
  const router = useRouter(); //retrieve an object to change URL
  const pathname = usePathname();//retrieve base of making a new URL
  const searchParams = useSearchParams();//retrieve an object setting current URL to manipulate all of query parameter

  const currentQ = searchParams.get("q") ?? "";
  const currentSort = searchParams.get("sort") ?? "best-match";
  const currentLang = searchParams.get("lang") ?? "all";

  const [text, setText] = useState(currentQ);//basic input field 
  //store query strings to the zustand store 
  const setLastQueryString = useSearchStore(
    (state) => state.setLastQueryString
  );
  //copy all of URL parameter and create a new one to apply some change to URL
  const updateUrl = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };
  //debouncedURL
  const debouncedUpdateUrl = useDebouncedCallback((value) => {
    updateUrl("q", value);
  }, 500);

  // retrueve search params and store it to reuse the cache when user access the same page
  useEffect(() => {
    const queryString = searchParams.toString();
    if (queryString) {
      setLastQueryString(queryString);
    }
  }, [searchParams, setLastQueryString]);

  return (
    <>
      <div className="flex gap-2 my-4">
        <Select
          value={currentSort}
          onValueChange={(value) => updateUrl("sort", value)}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Sorted by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="best-match">Best Match</SelectItem>
            <SelectItem value="stars">Stars</SelectItem>
            <SelectItem value="forks">Forks</SelectItem>
            <SelectItem value="updated">Updated</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={currentLang}
          onValueChange={(value) =>
            updateUrl("lang", value === "all" ? null : value)
          }
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="go">Go</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search repositories..."
          value={text}
          onChange={(e) => {
            const val = e.target.value;
            setText(val);
            debouncedUpdateUrl(val);
          }}
          className="flex-1"
        />
      </div>
    </>
  );
}
