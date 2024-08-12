// import { IPermission } from './IPermission';
// import { IUser } from './IUser';

// export interface IRole {
//     id: number;
//     name: string;
//     createdAt: Date;
//     updatedAt: Date;
//     createdBy?: string;
//     permissions?: IPermission[];
//     users?: IUser[];
// }


// export interface IRole {
//     id?: string;
//     name: string;
//     createdAt?: Date;
//     updatedAt?: Date;
//     createdBy?: string;
//     permissions?: string[];
// }

// export interface IUpdateRolePermissions {
//     roleId: string;
//     permissionIds: string[];
// }


export interface IRole {
    id?: string;
    name: string;
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
    permissions?: string[]; // Array of Permission IDs
}

export interface IUpdateRole {
    id: string;
    name?: string;
    createdBy?: string;
    permissions?: string[]; // Array of Permission IDs
}