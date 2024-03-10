import { useQuery } from "react-query";
import { useWeatherQueryContext } from "src/contexts/WeatherQueryContext";

type Weather = {
  list: {
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: [
      {
        description: string;
        icon: string;
      },
    ];
    wind: {
      speed: number;
      deg: number;
    };
  }[];
  city: {
    country: string;
    name: string;
  };
};

export const useWeather = () => {
  const {
    city,
    unit: { value },
  } = useWeatherQueryContext();
  const query = new URLSearchParams();
  if (city) {
    query.append("q", city);
  }
  if (value) {
    query.append("units", value);
  }

  query.append("cnt", "5");
  return useQuery(
    ["city", city, value],
    async () => {
      const response = await fetch(`forecast?${query.toString()}`);
      if (!response.ok) throw new Error(response.statusText);
      return (await response.json()) as Weather;
    },
    { enabled: !!city },
  );
};
