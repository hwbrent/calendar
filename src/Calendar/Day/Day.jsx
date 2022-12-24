import React, { useState, useEffect, useContext, useMemo } from 'react';
import { DateContext, TimetableContext } from '../Calendar';
import { useForceRerender } from '../misc/components';
import { add0Prefix, convertHHMMtoFloat, getActivities, isToday, range, Weekdays } from '../misc/functions';

/**
 * Returns a horizontal `svg` line indicating the current time.
 * @returns {svg} line
 * @see {@link https://www.w3schools.com/graphics/svg_line.asp}
 */
function TimeLine() {
    const forceRerender = useForceRerender();

    useEffect(() => {
        forceRerender();
        const interval = setInterval(forceRerender, 60_000);
        window.addEventListener('resize', forceRerender);
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', forceRerender);
        };
    }, []);

    const now = new Date();
    const hrs = now.getHours();
    const mins = now.getMinutes();

    /* Figure out WHERE the line needs to be drawn. */

    const tr = document.querySelector(`.day.slot[data-start="${hrs}"]`);
    if (!tr) {
        console.error('Error - No <tr> found.');
        return;
    }

    const trDims = tr.getBoundingClientRect();
    const lineY = trDims.y + ((mins/60) * trDims.height);

    /* Specify styling for SVGs */

    const RED = 'rgb(255,0,0)';

    const svgProps = {
        height: window.innerHeight,
        width: window.innerWidth
    };
    const lineProps = {
        x1: trDims.left,
        y1: lineY,
        x2: trDims.right,
        y2: lineY,
        style: {stroke: RED, strokeWidth: 1},
    };
    const radius = 3;
    const circleProps = {
        cx: trDims.left + radius,
        cy: lineY,
        r: radius,
        style: {fill: RED}
    };

    /* Create label */

    const timeNow = `${add0Prefix(now.getHours())}:${add0Prefix(now.getMinutes())}`;
    const labelStyle = {
        top: `${lineY - 9}px`,
        left: `${lineProps.x1 - 55}px`,
        color: RED
    };
    const label = (
        <div className='time-label' style={labelStyle}>
            {timeNow}
        </div>
    );

    return (
        <>
        <svg {...svgProps}>
            <line {...lineProps}/>
            <circle {...circleProps}/>
        </svg>
        {label}
        </>
    );
}

export default function Day(props) {
    const [ date, setDate ] = useContext(DateContext);
    const timetable = useContext(TimetableContext);
    const [ timeLabels, setTimeLabels ] = useState([]);

    // The filtered activities that are specific to THIS day.
    const activities = useMemo(() => getActivities(date,timetable),[date, timetable]);

    // The time slots (<tr>s) and events contained within the time slots (<td>s).
    const trs = useMemo(() => {
        return Array
            .from(range(24))
            .map((i) => {
                const startTime = `${i < 10 ? 0 : ''}${i}:00`; // e.g. 17:00

                const tds = activities
                    .filter((act) => act.Start.slice(0,5) === startTime)
                    .map((activity) => {
                        const duration = convertHHMMtoFloat(activity.Duration) || 1;
                        return (
                            <td className='day event' rowSpan={duration}>
                                {activity.Activity}
                            </td>
                        );
                    });

                return (
                    <tr className='day slot' key={i} data-start={i} data-end={i+1}>
                        &nbsp;
                        {tds}
                    </tr>
                );
            });
    }, [activities]);

    // Update the time labels. Tis makes them rerender positioned correctly
    useEffect(() => {
        setTimeLabels(getTimeLabels());
    }, [activities, date]);

    /* Add times next to <tr> borders */
    const getTimeLabels = () => {
        const labels = [];

        const daySlots = document.querySelectorAll('.day.slot');
        for (let [index, tr] of daySlots.entries()) {

            const trDims = tr.getBoundingClientRect();
            const labelStyle = {};

            // Get the coordinates of the label based off the top border of the <tr>
            labelStyle.top = `${trDims.top - 10}px`;
            labelStyle.left = `${trDims.left - 55}px`;

            const time = `${index < 10 ? 0 : ''}${index}:00`;
            labels.push(<div className='time-label' style={labelStyle} key={index}>{time}</div>);

            // Add a label adjacent to the bottom of the last <tr>
            if (index === daySlots.length-1) {
                const lastLabelStyle = {
                    top: `${trDims.bottom - 10}px`,
                    left: `${trDims.left - 55}px`
                };
                labels.push(<div className='time-label' style={lastLabelStyle} key={index+1}>00:00</div>);
            }
        }
        return labels;
    }

    const contents =
        activities.length === 0
        ? <h3>No events found for this day!</h3>
        : (
            <>
            <table className='day'>
                <tbody>
                    {trs}
                </tbody>
            </table>
            <div id='timeLabels'>
                {timeLabels}
            </div>
            </>
        )

    return (
        <div>
            <h3>{Weekdays[date.getDay()]}</h3>
            {contents}
            {isToday(date) ? <TimeLine/> : null}
        </div>
    );
}
