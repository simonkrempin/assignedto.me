import React, {ReactNode} from "react";

import "./style.css";

type Size = "large" | "small";

interface inputProps {
    size : Size;
    color: "lighter" | "darker" 
    selected: boolean;
    onClick: () => void;
    children: ReactNode; // Added children prop
}

const Button = ({size, color, selected, onClick, children}: inputProps ) => {
    const buttonClassName = size === 'large' ? 'btnLarge' : 'btnSmall';
    
    switch (size) {
        case "large":
            return (
                // For large Button selected function should change the color prop to darker
                <button className={`${buttonClassName} ${color}`}   onClick={onClick}>
                    {children}
                </button>
            );
        case "small":
            return (
                // Small Button is for links only as settings, login, register etc.
                // Do not use darker color, as it adds background and a border to the button
                <button className={`${buttonClassName} ${color}`} onClick={onClick}>
                    {children}
                </button>
            )

    }
}

export { Button };
