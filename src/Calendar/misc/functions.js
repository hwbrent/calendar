import Day from "../Day/Day";

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
    10: 'November',
    11: 'December'
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

export const convertHourNumToHHMM = (num) => new Date(0,0,0,num).toISOString().search(/\d\d:\d/);

/**
 * Sets the browser tab name using the current calendar view name.
 *
 * @param {'DAY'|'WEEK'|'MONTH'|'YEAR'} viewName - the type of format that the calendar is currently being viewed in
 * @returns {void} void
 * @see Calendar - the useEffect
 * @example
 * const viewName = 'WEEK';
 * setDocumentTitle(viewName); // --> document.title = 'Week view - Timetable';
 */
export function setDocumentTitle(viewName) {
    document.title = `${capitaliseFirstLetter(viewName)} view - Timetable`;
}

/**
 * Formats `string` such that the first letter of each word is capitalised, and the other letters are lowercase.
 * @param {string} string 
 */
export function capitaliseFirstLetter(string) {
    return string
        .split(' ')
        .map((word) => {
            const first = word[0].toUpperCase();
            const rest = word
                .slice(1)
                .split('')
                .map((char) => char.toLowerCase())
                    .join('');
                return first + rest;
        })
        .join('');
};

export const formatTime = (timeStr) => timeStr.slice(0,5);

/**
 * Gets all the activites in `timetable` that occur on `date`.
 *
 * @param {Date} date - the date
 * @param {object} timetable - the timetable from which to get the activites
 * 
 * @returns {object[]} the activites in the timetable which occur on the same day as the date passed in.
 */
export function getActivities(date, timetable) {
    const dotw = Weekdays[date.getDay()];
    const dayActivities = timetable[dotw];

    if (dayActivities.length === 0) {
        return [];
    }

    const convertedDate = convertDateToYYYYMMDD(date);
    dayActivities.filter((act) => {
        return act.Dates && act.Dates instanceof Array && act.Dates.includes(convertedDate);
    });

    return dayActivities;
}

/**
 * Converts a time in the string form HH:MM (or HH:MM:SS) to a floating point `number`.
 * @param {string} hhmm - from activity `Start` property
 * @returns {number}
 * @see {@link Day} - Used here
 */
export function convertHHMMtoFloat(hhmm) {
    console.assert(typeof hhmm === 'string');

    const digits = hhmm.matchAll(/\d+/g);
    if (digits) {
        const hours = digits.next().value; // integer
        const minutes = digits.next().value; // floating point number in range 0-1
        return parseFloat(hours) + (parseFloat(minutes)/60);
    }
    return null;
}

export function isToday(paramDate) {
    const today = new Date();
    return paramDate.getFullYear() === today.getFullYear()
        && paramDate.getMonth() === today.getMonth()
        && paramDate.getDate() === today.getDate();
}

export const add0Prefix = (num) => num < 10 ? `0${num}` : String(num);

/**
 * Emulates the python `range` function.
 * @param {number} n
 * @returns {Iterator<Array<number>>}
 * @see {@link https://stackoverflow.com/a/37980601}
 */
export function range(n) {
    return Array(n).keys();
}
