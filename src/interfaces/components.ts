export interface TaskContainerProps {
    id: string;
    title: string;
    description: string;
    date: Date;
    completed: boolean;
}

export interface DatePickerProps {
    date: Date;
}