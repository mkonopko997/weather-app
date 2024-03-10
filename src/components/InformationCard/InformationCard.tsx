import { useWeather } from "src/hooks/useWeather/useWeather";
import { useWeatherQueryContext } from "src/contexts/WeatherQueryContext";
import { units } from "src/constans/units";
import { Loading } from "src/templateComponents/Loading";
import { Tag } from "src/templateComponents/Tag";
import { CardContainer } from "src/templateComponents/CardContainer";

export const InformationCard = () => {
  const { data, error } = useWeather();
  const { unit, setUnit, dayNumber } = useWeatherQueryContext();

  if (error) {
    return <CardContainer>{error.toString()}</CardContainer>;
  }

  if (!data) {
    return <Loading />;
  }

  const {
    main: { humidity, temp, temp_min, temp_max, feels_like, pressure },
    weather: [{ description, icon }],
    wind: { speed, deg },
  } = data.list[dayNumber];

  const {
    city: { name, country },
  } = data;

  return (
    <CardContainer>
      <div className="text-l">
        {name}, {country}
      </div>
      <div className="w-full">
        <div className="flex items-center">
          <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
          <div className="text-xl mb-2">{description}</div>
        </div>
      </div>

      <div className="flex items-start mb-3">
        <span className="text-3xl">{temp.toFixed()}</span>
        <div className="flex divide-x divide-dashed">
          {units.map((el) => (
            <span
              key={el.value}
              className={`px-2 cursor-pointer ${
                el === unit ? "font-bold" : ""
              }`}
              onClick={() => setUnit(el)}
            >
              {el.name}
            </span>
          ))}
        </div>
      </div>

      <Tag>
        Min temperature: {temp_min.toFixed()} {unit.name}
      </Tag>
      <Tag>
        Max temperature: {temp_max.toFixed()} {unit.name}
      </Tag>
      <Tag>
        Sensed temperature: {feels_like.toFixed()} {unit.name}
      </Tag>
      <Tag>Pressure: {pressure} hPa</Tag>
      <Tag>Humidity: {humidity} %</Tag>
      <Tag>
        Wind speed: {speed.toFixed()} {unit.value === "metric" ? "m/s" : "mph"},
        deg: {deg}°
      </Tag>
    </CardContainer>
  );
};
