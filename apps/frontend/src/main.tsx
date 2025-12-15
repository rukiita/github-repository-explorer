import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx";
import RepoDetailPage from "./pages/RepoDetailPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { repoListLoader, repoDetailLoader } from "./lib/loaders";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: repoListLoader,
      },
      {
        path: ":owner/:repo",
        element: <RepoDetailPage />,
        loader: repoDetailLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
