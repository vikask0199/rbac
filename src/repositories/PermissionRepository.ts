import { AppDataSource } from "../config/dbConfig";
import { Permission } from "../models/Permission";
import { Role } from "../models/Role";



export const getPermissionRepository = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource.getRepository(Permission);
}

export const getRoleRepository = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource.getRepository(Role);
}

export const createPermission = async (permission: Permission): Promise<Permission> => {
    const repository = await getPermissionRepository();
    return await repository.save(permission);
}

export const findPermissionById = async (id: string): Promise<Permission | null> => {
    const repository = await getPermissionRepository();
    return await repository.findOne({ where: { id }, relations: ['roles'] });
}

export const findAllPermissions = async (): Promise<Permission[]> => {
    const repository = await getPermissionRepository();
    return await repository.find({ relations: ['roles'] });
}

export const updatePermission = async (id: string, updatedData: Partial<Permission>): Promise<Permission | null> => {
    const repository = await getPermissionRepository();
    let permission = await repository.findOne({ where: { id } });

    if (!permission) {
        return null;
    }

    permission = repository.merge(permission, updatedData);
    return await repository.save(permission);
}

export const deletePermission = async (id: string): Promise<boolean> => {
    const repository = await getPermissionRepository();
    const permission = await repository.findOne({ where: { id }, relations: ['roles'] });

    if (permission && permission.roles.length > 0) {
        throw new Error('Cannot delete permission because it is associated with one or more roles.');
    }

    const result = await repository.delete(id);
    return result.affected !== 0;
}
