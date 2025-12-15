import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
import { SiteBreadcrumb } from "../components/siteBreadcrumb";

export default function RootLayout() {
  return (
    <div className="app-container">
      <Header />
      <SiteBreadcrumb />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
