import { IRole, IUpdateRole } from '../interfaces/IRole';
import { Role } from '../models/Role';
import { findAllPermissions, getPermissionRepository, getRoleRepository } from '../repositories/PermissionRepository';
import { createRole, deleteRole, findAllRoles, findRoleById } from '../repositories/RoleRepository';

export const createRoleService = async (data: IRole): Promise<Role> => {
    const role = new Role();
    role.name = data.name;
    role.createdBy = data.createdBy ? data.createdBy : '';

    if (data.permissions) {
        const permissions = await findAllPermissions();
        role.permissions = permissions.filter(permission => data.permissions!.includes(permission.id));
    }

    return await createRole(role);
}

export const getRoleByIdService = async (id: string): Promise<Role | null> => {
    return await findRoleById(id);
}

export const getAllRolesService = async (): Promise<Role[]> => {
    return await findAllRoles();
}

export const updateRoleService = async (data: IUpdateRole): Promise<Role | null> => {
    const roleRepository = await getRoleRepository();
    const permissionRepository = await getPermissionRepository();

    const role = await roleRepository.findOne({ where: { id: data.id } });
    if (!role) {
        return null; 
    }

    if (data.permissions && data.permissions.length > 0) {
        const permissions = await permissionRepository.findByIds(data.permissions);
        role.permissions = permissions;
    }

    if (data.name) role.name = data.name;
    if (data.createdBy) role.createdBy = data.createdBy;

    await roleRepository.save(role);

    return role;
};

export const deleteRoleService = async (id: string): Promise<boolean> => {
    return await deleteRole(id);
}