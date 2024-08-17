

export interface IUser {
    id?: string;
    username?: string;
    userEmail: string;
    password?: string;
    createdBy?: string;
    roles?: string[]; 
}

export interface IUpdateUser {
    id: string
    userEmail: string;
    username?: string;
    password: string;
    roles?: string[];
}

export interface IDeleteUser {
    userEmail: string;
}