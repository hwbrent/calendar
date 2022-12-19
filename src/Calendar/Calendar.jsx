import React, { useState, useEffect, createContext} from 'react';

import Day from './Day/Day';
import Week from './Week/Week';
import Month from './Month/Month';
import Year from './Year/Year';

import { Months, setDocumentTitle } from './misc/functions';
import { DateToggles } from './misc/components';

const sampleTimetable = require('./sample_timetable.json');

/**
 * A React useState holding the value of the `Date` currently being viewed in the calendar.
 * @type {React.useState}
 */
export const DateContext = createContext();

export const TimetableContext = createContext();

/**
 * An enum which maps each type of calendar view to its corresponding component.
 * @readonly
 * @enum
 * @property {JSX.Element} DAY - See {@link Day}.
 * @property {JSX.Element} WEEK - See {@link Week}.
 * @property {JSX.Element} MONTH - See {@link Month}.
 * @property {JSX.Element} YEAR - See {@link Year}.
 */
export const Views = {
    DAY: <Day/>,
    WEEK: <Week/>,
    MONTH: <Month/>,
    YEAR: <Year/>
};

/**
 * Provides a set of buttons which can be clicked to set the view format of the calendar.
 * 
 * @param {object} props
 * @param {() => setView} props.onClick
 */
function ViewButtons(props) {
    return (
        <div>
            <button type='button' value="DAY" onClick={props.onClick}>Day</button>
            <button type='button' value="WEEK" onClick={props.onClick}>Week</button>
            <button type='button' value="MONTH" onClick={props.onClick}>Month</button>
            <button type='button' value="YEAR" onClick={props.onClick} disabled>Year</button>
        </div>
    );
}

export default function Calendar(props) {

    useEffect(() => {
        console.log(sampleTimetable);
    }, []);
    
    // The type of calendar view that's being shown.
    // Default is Week. Can only ever be Day, Week, Month or Year.
    const [ view, setView ] = useState(Views.MONTH);

    useEffect(() => {
        const viewType = Object.keys(Views).find(property => Views[property] === view);
        setDocumentTitle(viewType);
    },[view]);

    // Both of the below are stored in context.
    const [ date, setDate ] = useState(new Date());
    const [ timetable, setTimetable ] = useState({});

    /**
     * Sets {@link view} to the component corresponding to the button in {@link ViewButtons} that was clicked.
     * @param {'DAY'|'WEEK'|'MONTH'|'YEAR'} value - The `value` attribute from the `<input>` tag in {@link ViewButtons}
     */
    const viewButtonsHandleChange = ({ target: { value } }) => {
        const viewComponent = Views[value];
        setView(viewComponent);
    };

    /**
     * 
     * @returns {string} New text to go in the `<h3>`.
     */
    function getViewHeaderText() {
        switch (view) {
            case Views.DAY:
                return `Day - ${date.getDate()} ${Months[date.getMonth()]} ${date.getFullYear()}`;
            case Views.WEEK:
                return `Week - ${date.getDate()} ${Months[date.getMonth()]} ${date.getFullYear()}`;
            case Views.MONTH:
                return `Month - ${Months[date.getMonth()]} ${date.getFullYear()}`;
            case Views.YEAR:
                return `Year - ${date.getFullYear()}`;
        }
    }

    return (
        <>
        <ViewButtons onClick={viewButtonsHandleChange}/>

        {/* <TimetableContext.Provider value={timetable}> */}
        <TimetableContext.Provider value={sampleTimetable}>
            <DateContext.Provider value={[ date, setDate ]}>

                <h3>{getViewHeaderText()}</h3>
                {view}

            </DateContext.Provider>
        </TimetableContext.Provider>
        </>
    );
}
