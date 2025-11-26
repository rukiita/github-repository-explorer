import React from "react";
import Favorite from "./favorite";
import History from "./ui/history";
import ToggleTheme from "./ui/toggleTheme";
import FilterBar from "./ui/filterBar";

export default function Header() {
  return (
    <>
      <div className="flex">
        <div className="flex row">
          <Favorite />
          <History />
          <ToggleTheme />
        </div>
        <FilterBar />
      </div>
    </>
  );
}
