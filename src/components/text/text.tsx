import react from "react";

type TextMode = "name" |"button"|"title"| "discription";

interface TextProps {
    children: React.ReactNode;
    mode: TextMode;
}

const Text = ({ children, mode = "discription" }: TextProps) => {
    switch (mode) {
        case "name": 
            return <h1>{children}</h1>
        case "button":
            return <h2>{children}</h2>
        case "title":
            return <h3>{children}</h3>
        default:
            return <p>{children}</p>
    }
}

export { Text };