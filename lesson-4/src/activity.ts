
export function getActivity(day: Days): string {
    switch (day) {
        case Days.Monday:
        case Days.Tuesday:
        case Days.Wednesday:
        case Days.Thursday:
        case Days.Friday:
            return "Work";
        case Days.Saturday:
            return "Sports";
        case Days.Sunday:
            return "Rest";
        default:
            return "Unknown";
    }
}


export enum Days {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday"
}