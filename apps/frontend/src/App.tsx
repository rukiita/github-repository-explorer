import { Outlet } from "react-router-dom";
import FilterBar from "./components/filterBar";
import Header from "./components/header/header";
import { SiteBreadcrumb } from "./components/siteBreadcrumb";

function App() {
  return (
    <div className="container mx-auto">
      <Header />
      <SiteBreadcrumb />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
