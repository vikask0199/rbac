import { IPermission, IUpdatePermission } from "../interfaces/IPermission";
import { Permission } from "../models/Permission";
import { createPermission, deletePermission, findAllPermissions, findPermissionById, updatePermission } from "../repositories/PermissionRepository";



export const createPermissionService = async (data: IPermission): Promise<Permission> => {
    const permission = new Permission();
    permission.name = data.name;
    permission.createdBy = data.createdBy ? data.createdBy : '';

    return await createPermission(permission);
}

export const getPermissionByIdService = async (id: string): Promise<Permission | null> => {
    return await findPermissionById(id);
}

export const getAllPermissionsService = async (): Promise<Permission[]> => {
    return await findAllPermissions();
}

export const updatePermissionService = async (data: IUpdatePermission): Promise<Permission | null> => {
    return await updatePermission(data.id, data);
}

export const deletePermissionService = async (id: string): Promise<boolean> => {
    return await deletePermission(id);
}