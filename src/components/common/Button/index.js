import styles from "./index.module.scss"

const Button = ({
    children,
    onClick,
    disabled
}) => {
    return (
        <button  
            disabled={disabled} 
            className={styles.button} 
            onClick={(e) => {onClick(e)}}
        >
            {children}
        </button>
    );
};

export default Button;