import { In } from "typeorm";
import { AppDataSource } from "../config/dbConfig";
import { Role } from "../models/Role";


export const getRoleRepository = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource.getRepository(Role);
}

export const createRoleRepo = async (role: Role): Promise<Role> => {
    const repository = await getRoleRepository();
    return await repository.save(role);
}


export const updateRoleRepo = async (role: Role): Promise<Role | null> => {
    const repository = await getRoleRepository();
    const updatedRole = await repository.save(role);
    return updatedRole; 
}

export const checkRoleExistsRepo = async (name: string): Promise<Role | null> => {
    const repository = await getRoleRepository();
    return await repository.findOne({ 
        where: { 
            roleName: name,
        }, 
        relations: ['permissions']
    });
}

export const findRoleByRoleNameRepo = async (name: string): Promise<Role | null> =>{
    if (!name) {
        throw new Error('Role name is required');
    }

    const repository = await getRoleRepository();
    const lowerCaseName = name.toLowerCase();

    return await repository.findOne({
        where: {
            roleName: lowerCaseName
        },
        relations: ['permissions']
    });
}

export const findAllRolesRepo = async (): Promise<Role[]> => {
    const repository = await getRoleRepository();
    return await repository.find({ relations: ['permissions'] });
}


export const deleteRoleByRoleNameRepo = async (roleName: string): Promise<boolean> => {
    const repository = await getRoleRepository();
    const result = await repository.delete({ roleName }); 
    return result.affected !== 0;
}


export const findAllRolesByNameRepo = async(roles: string[]): Promise<Role[]> =>{
    const repository = await getRoleRepository();
    console.log(roles, "repositories")
    const findAllRolesByNameRepos = await repository.find({
        where:{
            roleName: In(roles)
        }
    })
    return findAllRolesByNameRepos;
}