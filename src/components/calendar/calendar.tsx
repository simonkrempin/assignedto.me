"use client";

import react from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./calendar.css";

const Calendar = () => {
    const [startDate, setStartDate] = react.useState(new Date());
    const [endDate, setEndDate] = react.useState(new Date());

    const onChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <div>
            <DatePicker
                todayButton="Heute"
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                disabledKeyboardNavigation
            />
        </div>
    );
};

export { Calendar };
