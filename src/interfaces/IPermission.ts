export interface IPermission {
    id?: string;
    name: string;
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUpdatePermission {
    id: string;
    name?: string;
    createdBy?: string;
}