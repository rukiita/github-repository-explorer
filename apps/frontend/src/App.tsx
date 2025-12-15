import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import RepoDetailPage from "./pages/RepoDetailPage";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <ReactQueryProvider>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="repos/:owner/:repo" element={<RepoDetailPage />} />
          </Route>
        </Routes>
      </ReactQueryProvider>
    </BrowserRouter>
  );
}

export default App;
