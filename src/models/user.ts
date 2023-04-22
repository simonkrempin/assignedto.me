export interface User {
    id?: string;
    username: string;
    email: string;
    created?: Date;
    updated?: Date;
}

export interface RegisterUser {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}