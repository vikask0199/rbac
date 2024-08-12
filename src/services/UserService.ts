import { IUpdateUser, IUser } from "../interfaces/IUser";
import { Role } from "../models/Role";
import { User } from "../models/User";
import { getRoleRepository } from "../repositories/RoleRepository";
import { createUser, deleteUser, findAllUsers, findUserById, updateUser } from "../repositories/UserRepository";




export const createUserService = async (userData: IUser): Promise<User> => {
    const roleRepository = await getRoleRepository();

    let roles: Role[] = [];
    if (userData.roles && userData.roles.length > 0) {
        roles = await roleRepository.findByIds(userData.roles);
    }

    const newUser: Partial<User> = {
        ...userData,
        roles: roles
    };

    return await createUser(newUser);
};

export const updateUserService = async (userData: IUpdateUser): Promise<User | null> => {
    const roleRepository = await getRoleRepository();

    let roles: Role[] = [];
    if (userData.roles && userData.roles.length > 0) {
        roles = await roleRepository.findByIds(userData.roles);
    }

    const updatedUser: Partial<User> = {
        ...userData,
        roles: roles
    };

    return await updateUser(userData.id, updatedUser);
};

// export const updateUserRolesService = async (userId: string, roleIds: string[], overwrite: boolean = false): Promise<User | null> => {
//     const userRepository = await getUserRepository();
//     const roleRepository = await getRoleRepository();

//     const user = await userRepository.findOne(userId, { relations: ['roles'] });
//     if (!user) {
//         throw new Error('User not found');
//     }

//     const newRoles = await roleRepository.findByIds(roleIds);

//     if (overwrite) {
//         user.roles = newRoles;
//     } else {
//         const roleSet = new Set(user.roles.map(role => role.id));
//         newRoles.forEach(role => roleSet.add(role.id));
//         user.roles = await roleRepository.findByIds(Array.from(roleSet));
//     }

//     return await userRepository.save(user);
// };

export const deleteUserService = async (id: string): Promise<boolean> => {
    return await deleteUser(id);
};

export const getUserByIdService = async (id: string): Promise<User | null> => {
    return await findUserById(id);
};

export const getAllUsersService = async (): Promise<User[]> => {
    return await findAllUsers();
};