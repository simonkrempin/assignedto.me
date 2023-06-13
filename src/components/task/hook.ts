import { useReducer } from "react";

interface TaskProps {
    title: string;
    description: string;
    date: Date;
    completed: boolean;
    assignees: string;
}

interface FocusState {
    isFocused: Boolean;
}

type State = TaskProps & FocusState;
type Action = Partial<State>;

const reducer = (state: State, action: Action) => {
    return { ...state, ...action };
};

const useTask = (initialState: State) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setCompleted = (completed: boolean) => {
        dispatch({ completed });
    };

    const setFocused = (isFocused: boolean) => {
        dispatch({ isFocused });
    };

    const toggleFocus = () => {
        setFocused(!state.isFocused);
    };

    const setTitle = (title: string) => {
        dispatch({ title });
    };

    const setDescription = (description: string) => {
        dispatch({ description });
    };

    const setAssignees = (assignees: string) => {
        dispatch({ assignees });
    };

    return { state, dispatch, setCompleted, setFocused, toggleFocus, setTitle, setDescription, setAssignees };
};

export { useTask };
