export interface IPermission {
    id?: string;
    permissionName: string;
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
    roles?: string[];
}

export interface IUpdatePermissionName {
    permissionName: string;
}

export interface IUpdatePermissionRole {
    roles: string[];
}