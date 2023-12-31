const TEMP_FREEZES = 32;

export function fahrenheitToCelsius(fahrenheit) {
    // eslint-disable-next-line
    return (fahrenheit - TEMP_FREEZES) / 1,8;
} 
