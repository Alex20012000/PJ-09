import styles from "./index.module.scss";

const Input = ({
    value,
    onChange,
    placeholder,
    name,
    type = "text"
}) => {
    return (
        <input 
            className={styles.input} 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            onChange={(e) => {onChange(e.currentTarget.value)}} 
            value={value}
        />
    );
};

export default Input;
