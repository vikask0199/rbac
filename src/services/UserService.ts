import { IUpdateUser, IUser } from "../interfaces/IUser";
import { Role } from "../models/Role";
import { User } from "../models/User";
import { findAllRolesByNameRepo, getRoleRepository } from "../repositories/RoleRepository";
import { createUserRepo, deleteUserRepo, findAllUsersRepo, findUserByEmailRepo, updateUserRepo } from "../repositories/UserRepository";
import { ServiceError } from "../utils/ServiceError";


export const createUserService = async (userData: IUser): Promise<User> => {
    const existUser = await findUserByEmailRepo(userData.userEmail)
    if(existUser){
        throw new ServiceError('User already exists', 409)
    }
    let roles: Role[] = [];
    if (userData.roles && userData.roles.length > 0) {
        console.log(userData.roles)
        roles = await findAllRolesByNameRepo(userData.roles);
        if(roles.length !== userData.roles.length){
            throw new ServiceError('One or more of the provided roles do not exist.', 400)
        }
    }

    const newUser: Partial<User> = {
        ...userData,
        roles: roles
    };

    const result = await createUserRepo(newUser)
    return result;
};

export const updateUserService = async (userData: IUpdateUser): Promise<User | null> => {
    const existUser = await findUserByEmailRepo(userData.userEmail)
    if(!existUser){
        throw new ServiceError('User not found', 404)
    }

    let roles: Role[] = [];
    if (userData.roles && userData.roles.length > 0) {
        roles = await findAllRolesByNameRepo(userData.roles);
        if(roles.length !== userData.roles.length){
            throw new ServiceError('One or more of the provided roles do not exist.', 400)
        }
    }

    const updatedUser: Partial<User> = {
        ...userData,
        roles: roles
    };

    return await updateUserRepo(updatedUser);
};

export const deleteUserService = async (userEmail: string): Promise<boolean> => {
    const existingUser = await findUserByEmailRepo(userEmail)
    if(!existingUser){
        throw new ServiceError('User not found', 404)
    }
    const checkTheAssociatedRoles = existingUser.roles
    if(checkTheAssociatedRoles && checkTheAssociatedRoles.length > 0){
        throw new ServiceError('Cannot delete user because it is associated with one or more roles.', 400);
    }
    const result = await deleteUserRepo(existingUser.id)
    return result;
};

export const getUserByEmailService = async (userEmail: string): Promise<User | null> => {
    const existingUser = await findUserByEmailRepo(userEmail)
    if(!existingUser){
        throw new ServiceError('User not found', 404)
    }
    return existingUser;
};

export const getAllUsersService = async (): Promise<User[]> => {
    const allUsers = await findAllUsersRepo()
    if(allUsers.length <= 0){
        throw new ServiceError('No users found', 404)
    }
    return allUsers;
};