export interface IRole {
    id?: string;
    roleName: string;
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
    permissions?: string[]; 
}

export interface IUpdateRole {
    roleName?: string;
    permissions?: string[]; 
    createdBy?: string;
}


export interface IGetRoleByName {
     roleName: string;
}


export interface IdeletedRoleByName {
     roleName: string;
}
