import styles from "./index.module.scss";

const Header = ({location}) => {
    return (
        <div className={styles.wrapper}>
            <h2>Погодные условия</h2>
            <p>Узнайте погоду в {location || "вашем городе"}!</p>
        </div>
    );
};

export default Header;
