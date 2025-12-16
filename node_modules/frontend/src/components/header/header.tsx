import Favorite from "../header/favorite";
import { History } from "../header/history";
import ToggleTheme from "./toggleTheme";

export default function Header() {
  return (
    <>
      <div className="flex">
        <div className="flex row">
          <Favorite />
          <History />
          <ToggleTheme />
        </div>
      </div>
    </>
  );
}
