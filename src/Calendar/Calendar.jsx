import React, { useState, useEffect, createContext, useContext} from 'react';

import Day from './Day/Day';
import Week from './Week/Week';
import Month from './Month/Month';

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
 * Provides a set of three radio buttons that allows the user to choose
 * how the 
 * @param {object} props
 * @param {Function} props.onChange
 * @returns {JSX.Element}
 */
function ViewRadios(props) {
    // TODO: allow user to specify default view. Perhaps save value in localStorage?
    let { onChange } = props;
    return (
        <div>
            <label>
                Day
                <input type='radio' name="view" value="DAY" onChange={onChange}/>
            </label>

            <label>
                Week
                <input type='radio' name="view" value="WEEK" onChange={onChange} defaultChecked/>
            </label>

            <label>
                Month
                <input type='radio' name="view" value="MONTH" onChange={onChange}/>
            </label>
        </div>
    );
}

export default function Calendar(props) {

    // The type of calendar view that's being shown.
    // Default is Week. Can only ever be Day, Week or Month.
    const [ view, setView ] = useState(Views.WEEK);

    /**
     * Stores the global date value used throughout the Calendar component.
     * Doing this allows the overall useState to be put into context, which
     * allows other components can get and set the date value without needing
     * to pass stuff through props lots of times.
     */
    const [ date, setDate ] = useState(new Date());

    /**
     * Sets {@link view} to the component corresponding to the radio button that was clicked.
     * @param {'DAY'|'WEEK'|'MONTH'} value - The `value` attribute from the `<input>` tag in {@link ViewRadios}
     */
    const viewRadiosHandleChange = ({ target: { value } }) => {
        const viewComponent = Views[value];
        setView(viewComponent);
    };

    return (
        <>
        <ViewRadios onChange={viewRadiosHandleChange}/>

        
        <TimetableContext.Provider value={null}>
            <DateContext.Provider value={[ date, setDate ]}>
                {view}
            </DateContext.Provider>
        </TimetableContext.Provider>

        </>
    );

}

/*
function TimetableVisualiser(props) {

    const dateUseState = useState(new Date());
    const timetableUseState = useState(sample_timetable);

    const [ timetable, setTimetable ] = timetableUseState;

    const [ viewType, setViewType ] = useState("day");

    useEffect(() => {
        async function fetchData() {
            const body = JSON.stringify(props.moduleCodes);
            const response = await handlePost("/get-timetable", body, "application/json");
            const data = await response.json();
            setTimetable(data);
        }
        fetchData();
    },[]);

    useEffect(() => console.log(timetable), [timetable]);

    let view = <div></div>;
    switch (viewType) {
        case "day":
            view = <DayTimetable/>;
            break;
        case "week":
            // view = <WeekTimetable/>;
            view = <div></div>;
            break;
        case "month":
            view = <MonthTimetable/>;
            break;
        default:
            break;
    }

    return (
        <>
        TimetableVisualiser

        <TimetableContext.Provider value={timetableUseState}>
            <DateContext.Provider value={dateUseState}>
                {view}
            </DateContext.Provider>
        </TimetableContext.Provider>

        <hr/>
        {JSON.stringify(timetable)}
        </>
    );
}
*/
