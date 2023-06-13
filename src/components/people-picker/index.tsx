import React from "react";
import Select, { SingleValue } from "react-select";

import "./style.css";
import { InputField } from "../input-field";

interface PeoplePickerProps {
    selectedUsers: string;
    addUser: (user: string) => void;
}

const PeoplePicker = ({ selectedUsers, addUser }: PeoplePickerProps) => {
    return <InputField text={selectedUsers} fieldStyle="small" changeText={addUser} label="Add user" />;
};

export default PeoplePicker;
