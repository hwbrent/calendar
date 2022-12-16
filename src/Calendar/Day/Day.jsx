import React, { useState, useEffect, useContext} from 'react';
import { DateContext, TimetableContext } from '../Calendar';

export default function Day(props) {
    const [ date, setDate ] = useContext(DateContext);
    const timetable = useContext(TimetableContext);

    return (
        <div>
            Day
        </div>
    );
}

/*
function DayTimetable(props) {
    const [ date, setDate ] = useContext(DateContext);
    const [ timetable, setTimetable ] = useContext(TimetableContext);

    const activities = getActivitiesOnThisDate(timetable, date);
    // console.log(activities);
    
    const dateString = date.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handleClick = (event) => {
        let tempYear = date.getFullYear();
        let tempMonth = date.getMonth();
        let tempDate = date.getDate();

        const changed = event.target.classList[0];
        const factor = event.target.innerText === LEFTARROW ? -1 : 1;

        if (changed === 'year') {
            tempYear += factor;
        } else if (changed === 'month') {
            tempMonth += factor;
        } else if (changed === 'day') {
            tempDate += factor;
        }

        const newDate = new Date(tempYear, tempMonth, tempDate);
        setDate(newDate);
    }

    const yearRow = (
        <LeftRightButtons
            left={{
                className: 'year left-button',
                onClick: handleClick
            }}
            centre={{ innerText: date.getFullYear() }}
            right={{
                className: 'year right-button',
                onClick: handleClick
            }}
        />
    );
    const monthRow = (
        <LeftRightButtons
            left={{
                className: 'month left-button',
                onClick: handleClick
            }}
            centre={{ innerText: MONTHS[date.getMonth()] }}
            right={{
                className: 'month right-button',
                onClick: handleClick
            }}
        />
    );
    const dayRow = (
        <LeftRightButtons
            left={{
                className: 'day left-button',
                onClick: handleClick
            }}
            centre={{ innerText: date.getDate() }}
            right={{
                className: 'day right-button',
                onClick: handleClick
            }}
        />
    );

    const tbody = () => {
        const trs = [];
        for (let i = 0; i < 24; i++) {
            const lowerBoundary = new Date(date.getTime());
            const upperBoundary = new Date(date.getTime());
            lowerBoundary.setUTCHours(i);
            lowerBoundary.setUTCMinutes(0);
            upperBoundary.setUTCHours(i+1);
            upperBoundary.setUTCMinutes(0);
            const tr = (
                <tr>
                    <td>
                    {get_HHMM(lowerBoundary)} - {get_HHMM(upperBoundary)}
                </td>
                    <td>
                        <TimeSlot
                            lowerBoundary={lowerBoundary}
                            upperBoundary={upperBoundary}
                            activities={activities}/>
                    </td>
                </tr>
            );
            trs.push(tr);
        }
        return trs;
    }

    const dayView = (
        <table>
            <thead>
                <TodayButton/>
                {yearRow}
                {monthRow}
                {dayRow}
            </thead>
            <hr/>
            <tbody>
                {tbody()}
                <hr/>
                {activities.map(val => JSON.stringify(val,0,4))}
            </tbody>
        </table>
    );

    return (
        <div className='day-timetable-grid-container'>
            <div className='day-timetable-grid-container-item'>
                {}
            </div>
            <div className='day-timetable-grid-container-item'>
                {dayView}
            </div>
        </div>
    );
}
*/