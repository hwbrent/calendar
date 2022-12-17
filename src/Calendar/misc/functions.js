/**
 * Enum with the days of the year as considered by the javascript `Date`.
 *
 * @enum
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth#return_value}
 */
export const Months = {
    // So that you can easily get the numeric value of the month
    // straight from the human-readable name.
    'January': 0,
    'February': 1,
    'March': 2,
    'April': 3,
    'May': 4,
    'June': 5,
    'July': 6,
    'August': 7,
    'September': 8,
    'October': 9,
    'November': 10,
    'December': 11,

    // So that you can easily get the name of the month
    // straight from Date.getMonth()
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    1: 'November',
    1: 'December'

};

/**
 * @enum
 */
export const Weekdays = {
    // So that you can easily get the numeric value of the day
    // straight from the human-readable name.
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6,

    // So that you can easily get the name of the day
    // straight from Date.getDay()
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
};

/**
 * Converts a `Date` object to a string in the YYYY-MM-DD format.
 *
 * This function is needed because in timetable activities, dates are stored in this format.
 *
 * @param {Date} date
 * @returns {string} date in YYYY-MM-DD format
 *
 * @example
 * const date = new Date(); // --> 'Sat Dec 17 2022 20:59:37 GMT+0000 (Greenwich Mean Time)'
 * convertDateToYYYYMMDD(date); // --> '2022-12-17'
 */
export const convertDateToYYYYMMDD = (date) => date.toISOString().slice(0,10);

/**
 * Gets all the activites in `timetable` that occur on `date`.
 *
 * @param {Date} date - the date
 * @param {object} timetable - the timetable from which to get the activites
 * 
 * @returns {object[]} the activites in the timetable which occur on the same day as the date passed in.
 */
export function getActivites(date, timetable) {
    
    const dotw = Weekdays[date.getDay()];
    const dayActivities = timetable[dotw];
    
    const convertedDate = convertDateToYYYYMMDD(date);
    dayActivities.filter((act) => act.Dates.includes(convertedDate));

    return dayActivities;
}
