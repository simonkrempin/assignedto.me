import React from "react";

const InputField = () => {
    const handleClick = (event: any) => {
        event.stopPropagation();
    }

    return <div onClick={handleClick}>input field</div>;
};

export { InputField };
