import React from "react";

import { CreatedTask } from "@interfaces/requestResponse";

interface ToDoAction {
    type: "todo";
    payload: CreatedTask[];
}

interface AssignedAction {
    type: "assigned";
    payload: CreatedTask[];
}

interface AddAction {
    type: "add";
    payload: CreatedTask;
}

type UnhandledAction = {
    type: string | null;
} & Record<string, any>;

type CacheReducerAction = ToDoAction | AssignedAction | AddAction | UnhandledAction;

const cacheReducer = (state: any, action: CacheReducerAction) => {
    switch (action.type) {
        case "todo":
            return { ...state, todo: action.payload };
        case "assigned":
            return { ...state, assigned: action.payload };
        case "add":
            return { ...state, assigned: [...state.assigned, action.payload] };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

const useCache = () => {
    const [cache, setCache] = React.useReducer(cacheReducer, {});

    return [cache, setCache];
};

export { useCache };
