import React from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, 
        gcTime: 0, 
      },
    },
  });

export function renderWithClient(ui: React.ReactElement) {
  const testClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
}
