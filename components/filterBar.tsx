import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterBar() {
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
