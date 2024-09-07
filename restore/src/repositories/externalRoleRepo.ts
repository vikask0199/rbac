import { postgresDataSource } from "../config/dbConfig"
import { ExternalRole } from "../models/ExternalRole";



export const getExternalRoleRepository = async () => {
    if (!postgresDataSource.isInitialized) {
        await postgresDataSource.initialize();
    }
    return postgresDataSource.getRepository(ExternalRole)
}

export const getExternalRoleByNameRepo = async (name: string): Promise<ExternalRole | null> => {
    const repository = await getExternalRoleRepository();
    return repository.findOne({
        where: { externalRoleName: name },
        relations: ['permissions'],
    });
}


export const getAllExternalRolesRepo = async (): Promise<ExternalRole[]> => {
    const repository = await getExternalRoleRepository();
    return repository.find();
}


export const getRoleByRoleNameRepo = async (roleName: string): Promise<ExternalRole | null> => {
    const repository = await getExternalRoleRepository();
    
    return repository.findOne({
        where: { externalRoleName: roleName },
        relations: ['permissions'],
    });
}

export const getExternalRoleByIdRepo = async (externalRoleId: string): Promise<ExternalRole | null> => {
    const repository = await getExternalRoleRepository();
    return repository.findOne({
        where: { externalRoleId: externalRoleId },
        relations: ['permissions'],
    });
}


export const saveNewRoleRepo = async (data: ExternalRole): Promise<ExternalRole> => {
    const repository = await getExternalRoleRepository();
    return await repository.save(data);
}

