import Weather from "../Weather";
import {TO_DAY} from "./constants";

const WeatherController = ({
    switcherType,
    dailyWeather,
    fiveDayWeathers
}) => {
    if (switcherType === TO_DAY) {
        if (!dailyWeather) return;

        return (
            <Weather
                date={dailyWeather.dt}
                main={dailyWeather.main}
                name={dailyWeather.name}
                weather={dailyWeather.weather}
                wind={dailyWeather.wind}
                sys={dailyWeather.sys}
            />
        );
    } else {
        return fiveDayWeathers.map((weather) => <div key={weather.dt}>
            <Weather
                date={weather.dt}
                main={weather.main}
                name={weather.name}
                weather={weather.weather}
                wind={weather.wind}
                sys={weather.sys}
            />
        </div>);
    }
};

export default WeatherController;
