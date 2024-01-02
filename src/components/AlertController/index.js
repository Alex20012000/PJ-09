import {GEO_BLOCKED, EMPTY_LOCATION, NOT_FOUND_LOCATION} from '../AlertController/constans';
import styles from './index.module.scss';

const AlertController = ({
    existDataWeather,
    codeAlert
}) => {
    switch (codeAlert) {
        case NOT_FOUND_LOCATION: return <span className={styles.alert}>Населённый пункт не найден</span>; 
        case GEO_BLOCKED: return !existDataWeather && <span className={styles.alert}>Нет доступа к вашей геопозиции</span>; 
        case EMPTY_LOCATION: return !existDataWeather && <span className={styles.alert}>Введите ваш населённый пункт </span>; 
        default: return null;
    }
};

export default AlertController;
