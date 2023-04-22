export interface UserCreated {
    id: string;
    collectionId: string;
    collectionName: string;
    username: string;
    verified: boolean;
    emailVisibility: boolean;
    email: string;
    created: Date;
    updated: Date;
    name: string;
    avatar: string;
}

export interface UserAuthenticated {
    token: string;
    record: {
        id: string;
        collectionId: string;
        collectionName: string;
        username: string;
        verified: boolean;
        emailVisibility: boolean;
        email: string;
        created: Date;
        updated: Date;
        name: string;
        avatar: string;
    }
}

export interface BadRequest {
    code: 400;
    message: string;
    data: {
        name: {
            code: string;
            message: string;
        };
    };
}

export interface Forbidden {
    code: 403;
    message: string;
    data: {};
}