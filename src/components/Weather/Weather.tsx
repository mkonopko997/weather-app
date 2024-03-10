import { useWeatherQueryContext } from "src/contexts/WeatherQueryContext";
import { InformationCard } from "src/components/InformationCard/InformationCard";
import { debounce } from "lodash";
import { PrevButton } from "src/templateComponents/PrevButton";
import { NextButton } from "src/templateComponents/NextButton";

export const Weather = () => {
  const { city, setCity, dayNumber, setDayNumber } = useWeatherQueryContext();
  const debouncedSetCity = debounce(setCity, 1000);
  const today = new Date();
  today.setDate(today.getDate() + dayNumber);
  const dayName = today.toLocaleString("en-us", {
    weekday: "long",
  });

  return (
    <div className="flex flex-col align-center w-80 mt-4">
      <div>
        <input
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="City"
          onChange={({
            target: { value },
          }: React.ChangeEvent<HTMLInputElement>) => {
            debouncedSetCity(value);
          }}
        />
      </div>
      {city && (
        <>
          <InformationCard />
          <div className="flex w-full justify-between items-center mt-2">
            <PrevButton
              onClick={() => setDayNumber(dayNumber - 1)}
              disabled={dayNumber === 0}
            />
            <span className="text-lg">{dayName}</span>
            <NextButton
              onClick={() => setDayNumber(dayNumber + 1)}
              disabled={dayNumber === 4}
            />
          </div>
        </>
      )}
    </div>
  );
};
