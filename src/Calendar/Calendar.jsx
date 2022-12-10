import React, { useState, useEffect, createContext} from 'react';

import Day from './Day/Day';
import Week from './Week/Week';
import Month from './Month/Month';
import Year from './Year/Year';

export const DateContext = createContext();
export const TimetableContext = createContext();

/**
 * An enum which maps each type of calendar view to its corresponding component.
 * @property {JSX.Element} DAY - See {@link Day}.
 * @property {JSX.Element} WEEK - See {@link Week}.
 * @property {JSX.Element} MONTH - See {@link Month}.
 */
const Views = {
    DAY: <Day/>,
    WEEK: <Week/>,
    MONTH: <Month/>,
    YEAR: <Year/>
};

/**
 * 
 * @param {React.props} props
 * @param {Function} props.onClick
 */
function ViewButtons(props) {
    return (
        <div>
            <button type='button' value="DAY" onClick={props.onClick}>Day</button>
            <button type='button' value="WEEK" onClick={props.onClick}>Week</button>
            <button type='button' value="MONTH" onClick={props.onClick}>Month</button>
            <button type='button' value="YEAR" onClick={props.onClick}>Year</button>
        </div>
    );
}

export default function Calendar(props) {

    // The type of calendar view that's being shown.
    // Default is Week. Can only ever be Day, Week, Month or Year.
    const [ view, setView ] = useState(Views.WEEK);

    /**
     * Stores the global date value used throughout the Calendar component.
     * Doing this allows the overall useState to be put into context, which
     * allows other components can get and set the date value without needing
     * to pass stuff through props lots of times.
     */
    const [ date, setDate ] = useState(new Date());

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

        
        <TimetableContext.Provider value={null}>
            <DateContext.Provider value={[ date, setDate ]}>
                {view}
            </DateContext.Provider>
        </TimetableContext.Provider>

        </>
    );
}
