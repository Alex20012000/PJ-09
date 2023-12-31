import axios from "axios";

const baseURL = 'https://api.openweathermap.org/data/2.5';

export const request = {
    get: ({path, params}) => axios.get(`${baseURL}/${path}`, {params})
};
