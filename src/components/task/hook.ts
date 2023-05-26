import { useReducer } from "react";

interface TaskProps {
    title: String;
    description: String;
    date: Date;
    completed: Boolean;
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

    const setCompleted = (completed: Boolean) => {
        dispatch({ completed });
    };

    const setFocused = (isFocused: Boolean) => {
        dispatch({ isFocused });
    };

    const toggleFocus = () => {
        setFocused(!state.isFocused);
    };

    return { state, dispatch, setCompleted, setFocused, toggleFocus };
};

export { useTask };
