import {useCallback, useEffect, useState} from 'react';

import Header from '../Header';
import Form from '../Form';
import AlertController from '../AlertController';
import WeatherController from '../WeatherController';

import {request} from '../../api';
import {TO_DAY} from '../WeatherController/constants';
import {GEO_BLOCKED, EMPTY_LOCATION, NOT_FOUND_LOCATION} from '../AlertController/constans';

import styles from './index.module.scss';

function App() {

  const [switcherType, setSwitcherType] = useState(TO_DAY);
  
  const [geoLocation, setGeoLocation] = useState({});
  const [alert, setAlert] = useState(null);
  
  const [dailyWeather, setDailyWeather] = useState(null);
  const [fiveDayWeathers, setFiveDayWeathers] = useState(null);
  
  const getCurrentGeoLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude: lat, longitude: lon} = position.coords;
      setGeoLocation({lat, lon});
      setAlert(null);
    }, () => {
      setAlert(GEO_BLOCKED);
    });
  }, []);

  const getCurrentDailyWeather = (location) => {
    if (!location) return setAlert(EMPTY_LOCATION);

    request.get({
      path: "/weather", 
      params: {q: location, appid: process.env.REACT_APP_API_KEY}
    }).then(((res) => {
      const {main, name, weather, wind, sys, dt} = res.data;
      setDailyWeather({main, name, weather, wind, sys, dt});
      setGeoLocation(res.data.coord);
      setAlert(null);
    }))
    .catch((error) => {
      const status = error.response.status;
      if (status === 404) {
        setAlert(NOT_FOUND_LOCATION);
      } 
    })
  };

  const getNextAnyDayWeather = useCallback(({
    lat,
    lon,
    cnt
  }) => {
    request.get({
      path: "/forecast", 
      params: {lat, lon, cnt, appid: process.env.REACT_APP_API_KEY}
    }).then(((res) => {
      setFiveDayWeathers(res.data.list);
      setDailyWeather({...res.data.list[0], name: res.data.city.name, sys: dailyWeather?.sys});
    }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const {lat, lon} = geoLocation;
    if (lat && lon) {
      getNextAnyDayWeather({
        lat,
        lon,
        cnt: 5
      });
    }
  }, [geoLocation, getNextAnyDayWeather]);
  
const noDataWeather = !dailyWeather && !fiveDayWeathers

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.row}>
            <Header location={dailyWeather?.name} />
            <Form switcherDisabled={noDataWeather} getWeather={getCurrentDailyWeather} toSwitch={setSwitcherType} getCurrenPosition={getCurrentGeoLocation}/>
            <div className={styles.weathers}>
              <AlertController
                existDataWeather={!!dailyWeather}
                codeAlert={alert}
              />
              {!alert && <WeatherController 
                dailyWeather={dailyWeather} 
                switcherType={switcherType} 
                fiveDayWeathers={fiveDayWeathers}
              />}
            </div>
          </div>
        </div>  
      </div>  
    </div>
  );
}

export default App;
