import React, { useState, useEffect, useContext, useMemo } from 'react';
import { DateContext, TimetableContext } from '../Calendar';
import { getActivities, Weekdays } from '../misc/functions';

export default function Day(props) {
    const [ date, setDate ] = useContext(DateContext);
    const timetable = useContext(TimetableContext);

    const activities = useMemo(() => getActivities(date,timetable),[date, timetable]);

    const trs = [];
    for (let i=0; i<24; i++) {
        const lowerBound = i;
        const upperBound = i+1;

        const from = `${i < 10 ? 0 : ''}${i}:00`;
        const to = `${i+1 < 10 ? 0 : ''}${i+1}:00`;

        trs.push(
            <tr className='day slot' key={i} data-from={from} data-to={to}>&nbsp;</tr>
            // <tr className='day slot' key={i}>{lowerBound} - {upperBound}</tr>
        );
    }

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

    const table = (
        <table className='day'>
            {trs}
        </table>
    );

    return (
        <div>
            <h3>{Weekdays[date.getDay()]}</h3>
            {table}
            {getTimeLabels()}
        </div>
    );
}
