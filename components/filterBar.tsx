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
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchStore } from "@/store/useSearchStore";

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentQ = searchParams.get("q") ?? "";
  const currentSort = searchParams.get("sort") ?? "best-match";
  const currentLang = searchParams.get("lang") ?? "all";

  const [text, setText] = useState(currentQ);
  const debouncedText = useDebounce(text, 500);
  const setLastQueryString = useSearchStore(
    (state) => state.setLastQueryString
  );

  const updateUrl = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (debouncedText !== searchParams.get("q")) {
      updateUrl("q", debouncedText);
    }
  }, [debouncedText]);

  useEffect(() => {
    const queryString = searchParams.toString();
    if (queryString) {
      console.log("Saving query:", queryString);
      setLastQueryString(queryString);
    }
  }, [searchParams, setLastQueryString]);

  return (
    <>
      <div className="flex">
        <Select
          value={currentSort}
          onValueChange={(value) => updateUrl("sort", value)}
        >
          <SelectTrigger className="w-[180px]">
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
          <SelectTrigger className="w-[180px]">
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
          onChange={(e) => setText(e.target.value)}
          className="flex-1"
        />
      </div>
    </>
  );
}
