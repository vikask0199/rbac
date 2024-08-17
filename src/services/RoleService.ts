import { IRole, IUpdateRole } from '../interfaces/IRole';
import { Role } from '../models/Role';
import { findAllPermissionsByNames } from '../repositories/PermissionRepository';
import { checkRoleExistsRepo, createRoleRepo, deleteRoleByRoleNameRepo, findAllRolesRepo, findRoleByRoleNameRepo, getRoleRepository, updateRoleRepo } from '../repositories/RoleRepository';
import { arraysEqual } from '../utils/arraysEqual';

export const createRoleService = async (roleData: IRole): Promise<Role> => {
    const roleRepository = await getRoleRepository()
    const roleNameInLowerCase = roleData.roleName.toLowerCase()

    const isRoleExist = await checkRoleExistsRepo(roleNameInLowerCase)
    if(isRoleExist){
        throw new Error('Role with the same name already exists.')
    }

    let permissions: string | any[] = [];

    if (roleData.permissions && roleData.permissions.length > 0) {
        permissions = await findAllPermissionsByNames(roleData.permissions)
        if(permissions.length !== roleData.permissions.length){
            throw new Error('One or more of the provided permissions do not exist.')
        }
    }

    const newRole = roleRepository.create({
        ...roleData,
        roleName: roleNameInLowerCase,
        permissions,
    })

    return await createRoleRepo(newRole)
}


export const updateRoleService = async (roleName: string, roleData: IUpdateRole): Promise<Role | null> => {
    const roleRepository = await getRoleRepository();
    let role = await roleRepository.findOne({ where: { roleName } });

    if (!role) {
        throw new Error('Role not found');
    }

    const hasChanges = (
        roleData.permissions && 
        role.permissions && 
        !arraysEqual(roleData.permissions, role.permissions)
    );

    if (!hasChanges) {
        throw new Error('No changes detected');
    }

    if (roleData.permissions && roleData.permissions.length > 0) {
        const permissions = await findAllPermissionsByNames(roleData.permissions);
        if (permissions.length !== roleData.permissions.length) {
            throw new Error('One or more permissions not found');
        }
        role.permissions = permissions;
    }
    // role = roleRepository.merge(role, {
    //     roleName: roleData.roleName, 
    //     createdBy: roleData.createdBy,
    // });

    return await updateRoleRepo(role);
};



export const getRoleByRoleName = async (roleName: string): Promise<Role | null> => {
    const roleByName = await findRoleByRoleNameRepo(roleName);
    if(!roleByName){
        throw new Error('Role not found');
    }
    return roleByName 
}

export const getAllRolesService = async (): Promise<Role[]> => {
    const allRole = await findAllRolesRepo();
    if(!allRole){
        throw new Error('No roles found');
    }
    return allRole
}


export const deleteRoleByRoleNameService = async (name: string): Promise<boolean> => {
    const roleDetails = await findRoleByRoleNameRepo(name);
    if(!roleDetails){
        throw new Error('Role not found');
    }
    if(roleDetails && roleDetails.permissions && roleDetails.permissions.length > 0){
        throw new Error('Cannot delete role because it is associated with one or more permissions.');
    }
    const result  = await deleteRoleByRoleNameRepo(roleDetails.roleName)
    return result
}