import {format} from "date-fns";

export function timestampToHours (timestamp) {
    return format(timestamp*1000, "kk:mm");
};
