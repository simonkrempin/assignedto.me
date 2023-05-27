import react from "react";

import "./style.css";

type Mode = "large" | "small";

interface inputProps {
    mode : Mode;
    text: string;
}



const Button = ({text,mode}: inputProps) => {
    switch(mode) {
        case "large":
            return (
                <button className=" btn largeButton">{text}</button>
            );
        case "small":
            return (
                <button className=" btn smallButton">{text}</button>
            )
    }
    
};

export { Button };
