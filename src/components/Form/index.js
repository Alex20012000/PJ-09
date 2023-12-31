import {useCallback, useState} from "react";

import Button from "../common/Button";
import Input from "../common/Input";
import Icon from "../Icon";

import {FIVE_DAY, TO_DAY} from "../WeatherController/constants";

import styles from "./index.module.scss";
import LocationIcon from "../../assets/img/location.svg"


const Form = ({
    getCurrenPosition,
    getWeather,
    toSwitch,
    switcherDisabled
}) => {
    const [location, setLocation] = useState("");

    const onGetCurrenPosition = useCallback(() => {
        getCurrenPosition();
    }, [getCurrenPosition]);

    const onGetWeather = useCallback((e) => {
        e.preventDefault();
        getWeather(location);
    }, [location, getWeather]);

    const onSwitchToDay = useCallback(() => {
        toSwitch(TO_DAY);
    }, [toSwitch]);

    const onSwitchToFiveDay = useCallback(() => {
        toSwitch(FIVE_DAY);
    }, [toSwitch]);

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={onGetWeather}>
                <Input 
                    type="text" 
                    name="city" 
                    placeholder="Населённый пункт" 
                    value={location} 
                    onChange={setLocation} 
                />
                <Button onClick={onGetWeather}>Получить погоду</Button>
                <Icon className={styles.geoLocation} width={40} path={LocationIcon} onClick={onGetCurrenPosition} />
            </form>
            <div>
                <Button disabled={switcherDisabled} onClick={onSwitchToDay}>Сегодня</Button>
                <Button disabled={switcherDisabled} onClick={onSwitchToFiveDay}>5 дней</Button>
            </div>
        </div>
    );
};

export default Form;
