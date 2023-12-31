import {format} from "date-fns";

export function timestampToDate (timestamp) {
    return format(timestamp*1000, "dd/MM/yyyy");
};
