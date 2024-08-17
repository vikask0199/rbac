import { In } from "typeorm";
import { AppDataSource } from "../config/dbConfig";
import { Permission } from "../models/Permission";



export const getPermissionRepository = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource.getRepository(Permission);
}

export const getPermissionByPermissionNameRepo = async (pName: string): Promise<Permission | null> => {
    const repository = await getPermissionRepository();
    const permission = await repository.findOne({
        where: {
            permissionName: pName,
        },
        relations: ['roles']
    })
    return permission;
}


export const getAllPermissionsRepo = async (): Promise<Permission[]> => {
    const repository = await getPermissionRepository();
    const permissions = await repository.find();
    return permissions;
}


export const createPermissionRepo = async (data: Permission): Promise<Permission> => {
    const repository = await getPermissionRepository();
    const savedRecords = await repository.save(data)
    return savedRecords;
}


export const updatePermissionRepo = async (data: Permission): Promise<Permission | null> => {
    const repository = await getPermissionRepository();
    const updatePermission = await repository.save(data)
    return updatePermission;
}

export const deletePermissonRole = async (permissionName: string): Promise<boolean> => {
    const repository = await getPermissionRepository();
    const result = await repository.delete({ permissionName })
    return result.affected !== 0
}

export const findAllPermissionsByNames = async (permissions: string[]): Promise<Permission[]> => {
    const respository = await getPermissionRepository();
    const findAllPermissionsByIds = await respository.find({
        where: {
            permissionName: In(permissions)
        }
    })
    return findAllPermissionsByIds;
}

