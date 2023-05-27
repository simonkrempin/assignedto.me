import react from "react";

import "./style.css";

type Mode = "large" | "small" | "link";

interface inputProps {
    mode : Mode;
    text: string;
}



const Button = ({text,mode}: inputProps) => {
    switch(mode) {
        case "large":
            return (
                <button className="largeBtn">{text}</button>
            );
        case "small":
            return (
                <button className="smallBtn">{text}</button>
            );
        case "link":
            return (
                <button className="linkBtn">{text}</button>
            )
    }
    
};

export { Button };
