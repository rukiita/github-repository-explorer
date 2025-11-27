"use client";
import React, { useEffect, useState } from "react";
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

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [text, setText] = useState(searchParams.get("q") ?? "");
  const debouncedText = useDebounce(text, 500);

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

  return (
    <>
      <Input
        placeholder="Search repositories..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Select>
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
      <Select>
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
    </>
  );
}
