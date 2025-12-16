import { Outlet } from "react-router-dom";
import FilterBar from "./components/filterBar";
import Header from "./components/header/header";
import { SiteBreadcrumb } from "./components/siteBreadcrumb";

function App() {
  return (
    <div className="container mx-auto">
      <Header />
      <SiteBreadcrumb />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
