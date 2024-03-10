import {
  render as originalRender,
  renderHook as originalRenderHook,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { WeatherQueryContextProvider } from "src/contexts/WeatherQueryContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const render = (element: React.ReactElement) => {
  return originalRender(
    <WeatherQueryContextProvider>
      <QueryClientProvider client={queryClient}>
        {element}
      </QueryClientProvider>
    </WeatherQueryContextProvider>,
  );
};

export const renderHook: typeof originalRenderHook = (render) => {
  return originalRenderHook(render, {
    wrapper: ({ children }) => (
      <WeatherQueryContextProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WeatherQueryContextProvider>
    ),
  });
};
