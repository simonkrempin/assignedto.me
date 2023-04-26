"use client";

import React from "react";

import "./styles.css";

export interface TaskContainerProps {
    title: string;
    description: string;
    date: string;
}

const TaskContainer = ({ title, description, date }: TaskContainerProps) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [isCompleted, setIsCompleted] = React.useState(false);

    return (
        <div className="horizontal-container root" onClick={() => setIsExpanded(true)}>
            <input type="checkbox" />
            <div className="vertical-container">
                <div className="horizontal-container">
                    <h1>{title}</h1>
                    <h2>{date}</h2>
                </div>
                <p>{description}</p>
            </div>
        </div>
    );
};

export { TaskContainer };
