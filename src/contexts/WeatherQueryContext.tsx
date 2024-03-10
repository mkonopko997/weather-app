import React, { createContext, FC, useContext, useState } from "react";
import { Unit, units } from "src/constans/units";

type WeatherQueryContextValue = {
  city: string;
  setCity: (val: string) => void;
  unit: Unit;
  setUnit: (val: Unit) => void;
  dayNumber: number;
  setDayNumber: (val: number) => void;
};

export const WeatherQueryContext = createContext<WeatherQueryContextValue>({
  city: "",
  setCity: () => null,
  unit: units[0],
  setUnit: () => null,
  dayNumber: 0,
  setDayNumber: () => null,
});

export const WeatherQueryContextProvider: FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState<Unit>(units[0]);
  const [dayNumber, setDayNumber] = useState(0);

  return (
    <WeatherQueryContext.Provider
      value={{
        city,
        setCity,
        unit,
        setUnit,
        dayNumber,
        setDayNumber,
      }}
    >
      {children}
    </WeatherQueryContext.Provider>
  );
};

export const useWeatherQueryContext = () => useContext(WeatherQueryContext);
