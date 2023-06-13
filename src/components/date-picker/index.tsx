import React from "react";

import ReactDatePicker from "react-datepicker";

import { DatePickerProps } from "@interfaces/components";

export const DatePicker = ({ date }: DatePickerProps): React.ReactElement => {
  const [selectedDate, setSelectedDate] = React.useState(new Date(date));

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="dd/MM/yyyy"
      selectsRange={false}
    />
  );
};