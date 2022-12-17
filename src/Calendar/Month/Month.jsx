import React, { useState, useEffect, useContext} from 'react';
import { DateContext, TimetableContext } from '../Calendar';

/**
 * Formats the current month into a 2D array, like in Apple Calendar's month view.
 * @param {number} year  - from {@link DateContext}.
 * @param {number} month - from {@link DateContext}.
 * @returns {(number|null)[][]}
 */
function getCells(year, month) {
    // Actually weeks but whatever
    const days = [[], [], [], [], [], []];

    // The first day of the current month (based off `year` and `month`).
    const firstDayOfMonth = new Date(year, month, 1);
    const dotw = firstDayOfMonth.getDay() - 1; // number from 0-6

    // Basically, the reason the below for loop works is because we offset `i`.
    // The offset is because the first day of the month is often NOT on a Monday.
    // So in the calendar view, we have days preceding the first of the month which 
    // appear in the month's view but aren't actually in that month. We can give
    // negative numbers to the Date constructor to get days from the previous month.
    // That's what we're doing here.
    for (let i=0; i < 42; i++) {
        const offset = i - dotw + 1;
        const date = new Date(year,month,offset);

        // Which of the 6 subarrays in `days` the day of the month should be added to.
        const daysSubarrayToPushTo = Math.floor(i / 7);
        
        // This checks if the current `week` being calculated is redundant, i.e. if it doesn't
        // contain any days that are actually in `month`.
        if (daysSubarrayToPushTo >= 4 && days[daysSubarrayToPushTo].length === 0 && date.getMonth() !== month) {
            days.splice(daysSubarrayToPushTo);
            break;
        }

        days[daysSubarrayToPushTo].push(date);
    }

    return days;
}

/**
 * 
 * @param {object} props
 * @param {Date} props.date - The (full) date corresponding to this day of the month
 */
function MonthDay(props) {
    return (
        <td className="month day">
            <div className="date-number">{props.date.getDate()}</div>
            <br/>
            <div className='actvity-count'>{null}</div>
        </td>
    );
}

export default function Month(props) {
    const [ date, setDate ] = useContext(DateContext);

    const weeks = getCells(date.getYear(), date.getMonth());
    const monthDays = weeks.map((week) => (
        <tr className="month week">{week.map((d) => (
            <MonthDay date={d} />
        ))}</tr>
    ))

    const table = (
        <table>
            <thead>
                <tr>
                    <td>Mon</td>
                    <td>Tue</td>
                    <td>Wed</td>
                    <td>Thu</td>
                    <td>Fri</td>
                    <td>Sat</td>
                    <td>Sun</td>
                </tr>
            </thead>
            <tbody>
                {monthDays}
            </tbody>
        </table>
    );

    return (
        <div>
            Month
            {table}
        </div>
    );
}

// /**
//  * Formats the current month into a 2D array, like in Apple Calendar's month view.
//  * @param {number} year  - from the corresponding useState in {@link MonthTimetable}.
//  * @param {number} month - from the corresponding useState in {@link MonthTimetable}.
//  * @returns {(number|null)[][]}
//  */
// function getCells(year, month) {
//     const days = [[], [], [], [], [], []];

//     // The first day of the current month (based off `year` and `month`).
//     const firstDayOfMonth = new Date(year, month, 1);
//     const dotw = firstDayOfMonth.getDay() - 1; // number from 0-6

//     // Basically, the reason the below for loop works is because we offset `i`.
//     // The offset is because the first day of the month is often NOT on a Monday.
//     // So in the calendar view, we have days preceding the first of the month which 
//     // appear in the month's view but aren't actually in that month. We can give
//     // negative numbers to the Date constructor to get days from the previous month.
//     // That's what we're doing here.
//     for (let i=0; i < 42; i++) {
//         const offset = i - dotw + 1;
//         const date = new Date(year,month,offset);

//         // Which of the 6 subarrays in `days` the day of the month should be added to.
//         const daysSubarrayToPushTo = Math.floor(i / 7);
        
//         // This checks if the last array in `days` is redundant, i.e. if it doesn't
//         // contain any days that are actually in `month`. Some months, e.g. January 2022,
//         // have to span 6 rows of 7 days. But some months won't need to. For the months
//         // that don't need to, the below if statement removes the last subarray to get rid
//         // of the redundant days and make the calendar view smaller and tidier.
//         if (daysSubarrayToPushTo === 5 && days[5].length === 0 && date.getMonth() !== month) {
//             delete days[5];
//             break;
//         }

//         const cell = <MonthCell date={date} timetable={sample_timetable} />;

//         days[daysSubarrayToPushTo].push(cell);
//         // days[daysSubarrayToPushTo].push(date.getDate());
//     }

//     return days;
// }

// /**
//  * @param {Object} props.timetable - the timetable containing activities.
//  * @param {Date} props.date - the calendar date corresponding to this cell.
//  */
//  function MonthCell(props) {
//     const activities = getActivitiesOnThisDate(props.timetable, props.date);
//     console.log(activities);

//     return (
//         <td className="timetable-cell">
//             <div className="date-number">{props.date.getDate()}</div>
//             <br/>
//             <div className='actvity-count'>{activities.length}</div>
//         </td>
//     );
// }

// /**
//  * Will be a table basically.
//  *
//  * User can cycle between years and months.
//  *
//  * @type {import('react').ReactComponentElement}
//  * @param {object} props.timetable
//  */
// function MonthTimetable(props) {

//     // the current date as of the render of the component
//     const _date = new Date(Date());

//     // Both of these will be able to be incremented/decremented
//     // by pressing a button. Hence why we use useState for their value.
//     const [ year, setYear ] = useState(_date.getFullYear());
//     const [ month, setMonth ] = useState(_date.getMonth());

//     /**
//      * Sets {@link month} and {@link year}.
//      * @param {MouseEvent} event - MouseEvent with type `'click'`.
//      */
//     const handleUpDownOnClick = (event) => {
//         let tempYear = year;
//         let tempMonth = month;

//         const direction = event.target.innerText;
//         const changed = event.target.classList[0];
//         const factor = direction === LEFTARROW ? -1 : 1;

//         if (changed === 'month') {
//             tempMonth += factor;
//         } else if (changed === 'year') {
//             tempYear += factor;
//         }

//         const newDate = new Date(tempYear, tempMonth, 1);

//         setMonth(newDate.getMonth());
//         setYear(newDate.getFullYear());
//     }

//     /**
//      * Button that, when clicked, sets the calendar to view the current month.
//      * @type {JSX.Element}
//      */
//     const todayButton = (
//         <button onClick={() => {
//             const date = new Date(Date());
//             setMonth(date.getMonth());
//             setYear(date.getFullYear());
//         }}>
//             Today
//         </button>
//     );

//     /**
//      * The part above the calendar with the current year and the buttons
//      * allowing you to toggle the year.
//      * This is a `<tr>` within the `<thead>` within the `<table>` returned by {@link MonthTimetable}.
//      * @type {JSX.Element}
//      */
//     const yearRow = (
//         <tr>
//             <td colSpan={3}>
//                 <button className='year left-button' onClick={handleUpDownOnClick}>{LEFTARROW}</button>
//             </td>
//             <td className='text-between-buttons'>{year}</td>
//             <td colSpan={3}>
//                 <button className='year right-button' onClick={handleUpDownOnClick}>{RIGHTARROW}</button>
//             </td>
//         </tr>
//     );

//     /**
//      * The part above the calendar with the current month and the buttons
//      * allowing you to toggle the month.
//      * This is a `<tr>` within the `<thead>` within the `<table>` returned by {@link MonthTimetable}.
//      * @type {JSX.Element}
//      */
//     const monthRow = (
//         <tr>
//             <td colSpan={3}>
//                 <button className='month left-button' onClick={handleUpDownOnClick}>{LEFTARROW}</button>
//             </td>
//             <td className='text-between-buttons'>
//                 {/* {new Intl.DateTimeFormat('en-US',{month:'long'}).format(month)} */}
//                 {MONTHS[month]}
//             </td>
//             <td colSpan={3}>
//                 <button className='month right-button' onClick={handleUpDownOnClick}>{RIGHTARROW}</button>
//             </td>
//         </tr>
//     );

//     /**
//      * {@link DAYS_OF_THE_WEEK} mapped to `<td>`s.
//      * @type {JSX.Element[]}
//      */
//     const daysOfTheWeekRow = (
//         <tr>
//             {DAYS_OF_THE_WEEK.map((value,key) => (
//                 <td key={key}>
//                     {value}
//                 </td>
//             ))}
//         </tr>
//     );

//     const cells = getCells(year, month);

//     const monthDays = cells.map((subArray, key1) => {
//         return (
//             <tr key={key1}>
//                 {subArray}
//             </tr>
//         );
//     });

//     return (
//         <table>
//             <thead>
//                 {todayButton}
//                 {yearRow}
//                 {monthRow}
//                 {daysOfTheWeekRow}
//             </thead>
//             <tbody>
//                 {monthDays}
//             </tbody>
//         </table>
//     );
// }
