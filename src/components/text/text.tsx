import react from "react";

type TextMode = "name"|"button"|"title"| "discription";

interface TextProps {
    text: string;
    mode: TextMode;
}

const Text = ({ text, mode = "discription" }: TextProps) => {
    switch (mode) {
        case "name": 
            return <h1>{text}</h1>
        case "button":
            return <h2>{text}</h2>
        case "title":
            return <h3>{text}</h3>
        default:
            return <p>{text}</p>
    }
}

export { Text };