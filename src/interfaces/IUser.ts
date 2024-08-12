
// export interface IUser {
//     id: number;
//     name: string;
//     email: string;
//     password: string;
//     roles?: IRole[];
// }



export interface IUser {
    id?: string;
    name: string;
    email: string;
    password?: string;
    isAccountActivated?: boolean;
    createdBy?: string;
    roles?: string[]; 
    superAdminId?: string;
}

export interface IUpdateUser extends Partial<IUser> {
    id: string;
}