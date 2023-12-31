const Icon = ({
    className,
    onClick,
    alt = "",
    width = 24,
    path
}) => {
    return <img 
        className={className}
        width={width} 
        onClick={(e) => {onClick && onClick(e)}} 
        src={path} 
        alt={alt} 
    />
};

export default Icon;
