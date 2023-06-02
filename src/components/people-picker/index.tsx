import React from "react";
import Select, { SingleValue } from "react-select";

import "./style.css";

interface OptionType {
    value: string;
    label: string;
}

const PeoplePicker = () => {
    const [selectedOption, setSelectedOption] = React.useState<SingleValue<OptionType>>(null);

    const options: Array<OptionType> = [
        { value: "jan", label: "Jan" },
        { value: "agravis", label: "Agravis" },
        { value: "lfit", label: "LFit" },
    ];

    return <Select value={selectedOption} onChange={setSelectedOption} options={options} />;
};

export default PeoplePicker;
