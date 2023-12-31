import Icon from "../Icon";

import {timestampToHours, timestampToDate} from "../../utils/dateConverter";
import {getWeatherByCode} from "../../utils/getWeatherByCode";
import {fahrenheitToCelsius} from "../../utils/tempConverter";

import styles from "./index.module.scss";

const getIconWeather = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

const Weather = ({
    date,
    main,
    weather,
    wind,
    sys
}) => {
    const sunrise = sys?.sunrise && timestampToHours(sys.sunrise);
    const sunset = sys?.sunset && timestampToHours(sys.sunset);

    const {icon: weatherIcon, id: weatherId} = weather[0];
    
    if (!main) return null;

    return (
        <div className={styles.wrapper}>
            <p className={styles.weatherRow}>
                <Icon width={40} path={getIconWeather(weatherIcon)}/>
                <span>{getWeatherByCode(weatherId)}</span>
            </p>
            <p>Температура: {fahrenheitToCelsius(main.temp)} °C</p>
            <p>Давление: {main.pressure} мм рт.ст.</p>
            <p>Скорость ветра : {wind.speed} м/с</p>
            {sunrise && sunset && <p>Восход/Закат: {sunrise}/{sunset}</p>}
            <p>Влажность: {main.humidity} %</p>
            <p>Дата: {timestampToDate(date)}</p>
        </div>
    );
};

export default Weather;
