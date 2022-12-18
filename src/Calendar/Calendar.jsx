import React, { useState, useEffect, createContext} from 'react';

import Day from './Day/Day';
import Week from './Week/Week';
import Month from './Month/Month';
import Year from './Year/Year';

import { setDocumentTitle } from './misc/functions';

const sampleTimetable = require('./sample_timetable.json');

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
const Views = {
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
    const [ view, setView ] = useState(Views.WEEK);

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

    return (
        <>
        <ViewButtons onClick={viewButtonsHandleChange}/>

        {/* <TimetableContext.Provider value={timetable}> */}
        <TimetableContext.Provider value={sampleTimetable}>
            <DateContext.Provider value={[ date, setDate ]}>
                {view}
            </DateContext.Provider>
        </TimetableContext.Provider>
        </>
    );
}
