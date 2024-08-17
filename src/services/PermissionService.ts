import { IPermission } from "../interfaces/IPermission";
import { Permission } from "../models/Permission";
import { Role } from "../models/Role";
import { createPermissionRepo, deletePermissonRole, getAllPermissionsRepo, getPermissionByPermissionNameRepo, getPermissionRepository, updatePermissionRepo } from "../repositories/PermissionRepository";
import { findAllRolesByNameRepo } from "../repositories/RoleRepository";
import { ServiceError } from "../utils/ServiceError";


export const createPermissionSvc = async (permission: IPermission): Promise<Permission> => {
    const permissionRepository = await getPermissionRepository()
    const lowerCasePermissionsName = permission.permissionName.toLowerCase();
    const existingPermissions = await getPermissionByPermissionNameRepo(permission.permissionName)
    if (existingPermissions) {
        throw new ServiceError(`Permission already exists.`, 400);
    }

    let roles: Role[] = [];

    if (permission.roles && permission.roles.length > 0) {
        roles = await findAllRolesByNameRepo(permission.roles)
        if (roles.length !== permission.roles.length) {
            throw new ServiceError('One or more of the provided roles do not exist.', 400)
        }
    }

    const newPermission = permissionRepository.create({
        ...permission,
        permissionName: lowerCasePermissionsName,
        roles,
    });
    return await createPermissionRepo(newPermission);
}



export const updatePermissionSvc = async (name: string, roles: string[]): Promise<Permission | null> => {
    const permissionRepo = await getPermissionRepository();
    let permission = await getPermissionByPermissionNameRepo(name)
    if (!permission) {
        throw new ServiceError('Permission not found', 404)
    }
    if (roles && roles.length > 0) {
        const allRoles = await findAllRolesByNameRepo(roles)
        if (allRoles.length !== roles.length) {
            throw new ServiceError('One or more of the provided roles do not exist.', 400)
        }
        permission.roles = allRoles
    }
    // permission = permissionRepo.merge(permission, {
    //     permissionName: name,
    //     createdBy: permission.createdBy,
    // })
    return await updatePermissionRepo(permission)
}


export const getPermissionByNameSvc = async (name: string): Promise<Permission> => {
    const isPermissionExist = await getPermissionByPermissionNameRepo(name)
    if (!isPermissionExist) {
        throw new ServiceError('Permission not found', 404)
    }
    return isPermissionExist
}

export const getAllPermissionSvc = async (): Promise<Permission[]> => {
    const allPermission = await getAllPermissionsRepo()
    if (allPermission.length <= 0) {
        throw new ServiceError('No permission found', 404)
    }
    return allPermission
}


export const deletePermissionSvc = async (name: string): Promise<boolean> => {
    const isPermissionExist = await getPermissionByPermissionNameRepo(name)
    if (!isPermissionExist) {
        throw new ServiceError('Permission not found', 404)
    }
    if (isPermissionExist && isPermissionExist.roles && isPermissionExist.roles.length > 0) {
        throw new ServiceError('Cannot delete permission because it is associated with one or more roles.', 400);
    }

    const result = await deletePermissonRole(name)
    return result
}