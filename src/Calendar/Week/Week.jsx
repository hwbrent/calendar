import React, { useState, useEffect, useContext} from 'react';
import { DateContext, TimetableContext } from '../Calendar';
import { Weekdays } from '../misc/functions';

export default function Week(props) {
    const [ date, setDate ] = useContext(DateContext);

    // whenever `date` is updated, 'round it' to the last monday if not already on monday
    useEffect(() => {
        if (date.getDay() !== Weekdays.Monday) {
            setDate(prev => {
                const copy = new Date(prev);
                const diff = copy.getDay() - Weekdays.Monday;
                copy.setDate(copy.getDate() - diff);
                return copy;
            });
        }
    }, [date]);

    return (
        <div>
            Week
        </div>
    );
}
