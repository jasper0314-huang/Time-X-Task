import React, { useState } from 'react';
import CalendarOpenSrc from 'react-calendar';

const Calendar = () => {
    const [date, setDate] = useState(new Date());

    const set_and_log = (value) => {
        console.log(value);
        setDate(value);
    } 

    return (
        <>
            <h1>Calendar</h1> 
            <CalendarOpenSrc
                onChange={set_and_log}
                showWeekNumbers
                value={date}
            />
        </>
    )
}

export default Calendar;