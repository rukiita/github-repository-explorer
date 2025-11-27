"use client";
import React, { useState } from "react";
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

interface FilterBarProps {
  initialQuery?: string;
  initialSort?: string;
  initialLang?: string;
}
export default function FilterBar({
  initialQuery = "",
  initialSortBy = "",
  initialLang = "",
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [text, setText] = useState(initialQuery);
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

  

  return (
    <>
      <Input />
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sorted by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Best Match</SelectItem>
          <SelectItem value="dark">Stars</SelectItem>
          <SelectItem value="system">Forks</SelectItem>
          <SelectItem value="system">Updated</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">TypeScript</SelectItem>
          <SelectItem value="dark">Python</SelectItem>
          <SelectItem value="system">JavaScript</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
