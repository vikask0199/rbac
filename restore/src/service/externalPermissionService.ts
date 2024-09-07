import { IExternalPermission } from "../interface/ExternalPermission";
import { ExternalPermission } from "../models/ExternalPermission";
import { getPermissionByIdRepo, getPermissionByNameRepo, savePermissionRepository } from "../repositories/externalPermissionRepo";
import { getRouteByIdRepo } from "../repositories/externalRouteRepository";
import { ServiceError } from "../utils/ServiceError";


export const createPermissionSvc = async (data: IExternalPermission): Promise<ExternalPermission> => {
    const existPermissions = await getPermissionByNameRepo(data.externalPermissionName)
    if (existPermissions) {
        throw new ServiceError(`Permission with name ${data.externalPermissionName} already exists`, 409);
    }
    const permission = new ExternalPermission();
    permission.externalPermissionName = data.externalPermissionName;

    if (data.routeId) {
        const route = await getRouteByIdRepo(data.routeId);
        if (!route) {
            throw new ServiceError(`Route with ID ${data.routeId} not found`, 404);
        }
        permission.route = route;
    }

    const savedPermission = await savePermissionRepository(permission);
    return savedPermission;
};



export const updatePermissionSvc = async (permissionId: string, data: IExternalPermission): Promise<ExternalPermission> => {
    const permission = await getPermissionByIdRepo(permissionId);
    if (!permission) {
        throw new ServiceError('Permission not found', 404);
    }

    if (data.externalPermissionName) {
        permission.externalPermissionName = data.externalPermissionName;
    }

    if (data.routeId) {
        const route = await getRouteByIdRepo(data.routeId);
        if (!route) {
            throw new ServiceError(`Route with ID ${data.routeId} not found`, 404);
        }

        // Detach old route if it exists
        if (permission.route) {
            const oldRoute = permission.route;
            oldRoute.permission = null; 
        }

        permission.route = route;
    } else {
        // Remove route association
        if (permission.route) {
            const oldRoute = permission.route;
            oldRoute.permission = null;
            permission.route = null;
        }
    }

    // Save the permission entity
    const updatedPermission = await savePermissionRepository(permission);
    return updatedPermission;
}
