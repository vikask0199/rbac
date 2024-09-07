import { IExternalRole } from "../interface/ExternalRoleInterface";
import { ExternalRole } from "../models/ExternalRole";
import { getPermissionByIdRepo } from "../repositories/externalPermissionRepo";
import { getExternalRoleByIdRepo, getExternalRoleByNameRepo, saveNewRoleRepo } from "../repositories/externalRoleRepo";
import { ServiceError } from "../utils/ServiceError";


export const createRoleSvc = async (data: IExternalRole): Promise<ExternalRole> => {
    if (!data.externalRoleName) {
        throw new ServiceError('External role name is required', 400);
    }

    const existingRole = await getExternalRoleByNameRepo(data.externalRoleName);

    if (existingRole) {
        throw new ServiceError('Role already exists', 409);
    }

    const externalRole = new ExternalRole();
    externalRole.externalRoleName = data.externalRoleName;

    if (data.permissionIds && data.permissionIds.length > 0) {
        const permissions = await Promise.all(
            data.permissionIds.map(async (permissionId) => {
                const permission = await getPermissionByIdRepo(permissionId);
                if (!permission) {
                    throw new ServiceError(`Permission with ID ${permissionId} not found`, 404);
                }
                return permission;
            })
        );
        externalRole.permissions = permissions;
    } else {
        externalRole.permissions = [];
    }

    return await saveNewRoleRepo(externalRole);
};


export const updateRoleSvc = async (externalRoleId: string, data: IExternalRole): Promise<ExternalRole> => {
    const { externalRoleName, permissionIds } = data;

    if (!externalRoleId) {
        throw new ServiceError('Role ID is required', 400);
    }

    const existingRole = await getExternalRoleByIdRepo(externalRoleId);

    if (!existingRole) {
        throw new ServiceError('Role not found', 404);
    }

    if (externalRoleName) {
        existingRole.externalRoleName = externalRoleName;
    }


    if (permissionIds) {
        const fetchedPermissions = await Promise.all(
            permissionIds.map(async (permissionId) => {
                const permission = await getPermissionByIdRepo(permissionId);
                if (!permission) {
                    throw new ServiceError(`Permission with ID ${permissionId} not found`, 404);
                }
                return permission;
            })
        );

        existingRole.permissions = fetchedPermissions;
    } else {
        existingRole.permissions = [];
    }

    return await saveNewRoleRepo(existingRole);
};
