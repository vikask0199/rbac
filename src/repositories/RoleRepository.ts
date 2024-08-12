import { AppDataSource } from "../config/dbConfig";
import { Permission } from "../models/Permission";
import { Role } from "../models/Role";



export const getRoleRepository = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource.getRepository(Role);
}

export const getPermissionRepository = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource.getRepository(Permission);
}

export const createRole = async (role: Role): Promise<Role> => {
    const repository = await getRoleRepository();
    return await repository.save(role);
}

export const findRoleById = async (id: string): Promise<Role | null> => {
    const repository = await getRoleRepository();
    return await repository.findOne({ where: { id }, relations: ['permissions'] });
}

export const findAllRoles = async (): Promise<Role[]> => {
    const repository = await getRoleRepository();
    return await repository.find({ relations: ['permissions'] });
}

export const updateRole = async (id: string, updatedData: Partial<Role>): Promise<Role | null> => {
    const repository = await getRoleRepository();
    let role = await repository.findOne({ where: { id } });

    if (!role) {
        return null;
    }

    role = repository.merge(role, updatedData);
    return await repository.save(role);
}

export const deleteRole = async (id: string): Promise<boolean> => {
    const repository = await getRoleRepository();
    const role = await repository.findOne({ where: { id }, relations: ['permissions'] });


    if (role && role.permissions && role.permissions.length > 0) {
        throw new Error('Cannot delete role because it is associated with one or more permissions.');
    }

    const result = await repository.delete(id);
    return result.affected !== 0;
}