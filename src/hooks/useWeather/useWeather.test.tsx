import { renderHook, waitFor } from "@testing-library/react";
import { useWeather } from "src/hooks/useWeather/useWeather";
import { WeatherQueryContext } from "src/contexts/WeatherQueryContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { Unit, units } from "src/constans/units";

const render = (params: { city: string; unit: Unit }) => {
  const queryClient = new QueryClient({});
  return renderHook(useWeather, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <WeatherQueryContext.Provider
          value={{
            ...params,
            dayNumber: 0,
            setCity: () => null,
            setUnit: () => null,
            setDayNumber: () => null,
          }}
        >
          {children}
        </WeatherQueryContext.Provider>
      </QueryClientProvider>
    ),
  });
};

describe("useWeather", () => {
  beforeEach(() => {
    fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => null,
      }),
    );
  });

  it("should fetch with city query", async () => {
    render({ unit: units[0], city: "London" });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "forecast?q=London&units=metric&cnt=5",
      );
    });
  });

  it("should fetch with unit query", async () => {
    render({ unit: units[1], city: "London" });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "forecast?q=London&units=imperial&cnt=5",
      );
    });
  });
});
