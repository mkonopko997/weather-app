import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Weather } from "src/components/Weather/Weather";
import { WeatherQueryContextProvider } from "src/contexts/WeatherQueryContext";
import "src/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WeatherQueryContextProvider>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col items-center mt-2">
          <h1 className="text-2xl">Weather</h1>
          <Weather />
        </div>
      </QueryClientProvider>
    </WeatherQueryContextProvider>
  </React.StrictMode>,
);
