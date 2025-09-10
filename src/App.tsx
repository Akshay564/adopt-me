import { createRoot } from "react-dom/client";
import { lazy, StrictMode, Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./context/AdoptedPetContext";
import SearchParams from "./components/SearchParams";
import { Pet } from "./api/ApiResponsesTypes";
import Header from "./components/Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const Details = lazy(() => import("./components/Details"));

const App = () => {
  const adoptedPet = useState<Pet | null>(null);

  return (
    <BrowserRouter>
      <Header />
      <AdoptedPetContext.Provider value={adoptedPet}>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div className="loading-pane">
                <h2 className="loader">🌀</h2>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<SearchParams />} />
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </AdoptedPetContext.Provider>
    </BrowserRouter>
  );
};

const container: HTMLElement | null = document.getElementById("root");

if (!container) {
  throw new Error("Root container not found");
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
