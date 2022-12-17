import React, { useState, useEffect, useContext} from 'react';
import { useForceRerender } from '../misc/components';
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
 * Popup div that provides a bit of extra information about the month day that has been
 * clicked on.
 * 
 * This component is rendered after a {@link MonthDay} is clicked, and it aligns itself
 * with said {@link MonthDay}. It provides brief details on which events happen on
 * that day.
 *
 * @param {object} props - React props
 * @param {number} props.dayKey - Coordinates for the top left of the div.
 */
function DayPopup(props) {
    const forceRerender = useForceRerender();

    // Rerender whenever the window is resized so that the popup
    // stays "attached" to the MonthDay.
    useEffect(() => {
        window.addEventListener('resize', forceRerender);
        return () => window.removeEventListener('resize', forceRerender);
    },[]);

    /**
     * Gets style properties that need to be rendered dynamically.
     * Obviously we prefer to put stuff in the css, but for things like the
     * coordinates of this `<div>`, we have to do that dynamically. Hence
     * this function.
     * @returns {{ top: string, left: string }}
     */
    function getStyle() {
        const style = {};

        /* GET COORDS */
        const monthDayTd = document.querySelector(`.month.day[data-key='${props.dayKey}']`);
        const dims = monthDayTd.getBoundingClientRect();

        style.top = `${dims.bottom}px`;
        style.left = `${dims.left}px`;

        return style;
    }

    return <div className='day-popup' style={getStyle()}>hi</div>;
}

/**
 * Represents an individual day in the {@link Month} calendar view.
 *
 * When clicked, it causes {@link DayPopup a popup} to be rendered
 *
 * @param {object} props
 * @param {Date} props.date - The (full) date corresponding to THIS day of the month
 * @param {number} props.dayKey - The unique key corresponding to this particular `MonthDay`.
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setPopupDayKey - `setPopupDayKey` from useState in {@link Month} to set the key of the day for which the popup should be rendered.
 * @see {@link Month} component
 */
function MonthDay(props) {

    const handleClick = () => {
        // If the new popup key is the same as the previous one, set the current value to null.
        // In practice, this means that if the user clicks a day of the month once, the popup
        // will mount. If they click the same day again, the popup will unmount.
        props.setPopupDayKey((prev) => prev === props.dayKey ? null : props.dayKey);
    };

    return (
        <td className="month day" data-key={props.dayKey} onClick={handleClick}>
            <div className="month day number">{props.date.getDate()}</div>
            <br/>
            <div className='actvity-count'>{null}</div>
        </td>
    );
}

/**
 * 
 * @param {object} props 
 * @returns {JSX.Element}
 */
export default function Month(props) {
    const timetable = useContext(TimetableContext);

    const [ date, setDate ] = useContext(DateContext);

    // We use this useState to help with rendering the day popup
    const [ popupDayKey, setPopupDayKey ] = useState(null);

    const weeks = getCells(date.getFullYear(), date.getMonth());
    const monthDays = weeks.map((week, index1) => (
        <tr className="month week" key={index1}>
            {week.map((d, index2) => {
                const key = index1*7 + index2;
                return <MonthDay date={d} dayKey={key} setPopupDayKey={setPopupDayKey}/>;
            })}
        </tr>
    ));

    const table = (
        <table className='month'>
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
            {popupDayKey === null ? null : <DayPopup dayKey={popupDayKey}/>}
        </div>
    );
}
