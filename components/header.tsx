import React from "react";
import Favorite from "./favorite";
import History from "./history";
import ToggleTheme from "./toggleTheme";
import FilterBar from "./filterBar";

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
