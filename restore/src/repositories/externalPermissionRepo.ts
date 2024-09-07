import { postgresDataSource } from "../config/dbConfig"
import { IExternalPermission } from "../interface/ExternalPermission";
import { ExternalPermission } from "../models/ExternalPermission";



export const getPermisionRepository = async () => {
    if (!postgresDataSource.isInitialized) {
        await postgresDataSource.initialize();
    }
    return postgresDataSource.getRepository(ExternalPermission)
}


export const getPermissionByNameRepo = async (name: string): Promise<ExternalPermission | null> => {
    const repository = await getPermisionRepository();
    return repository.findOne({ where: { externalPermissionName: name } });
}


export const getAllPermissionsRepo = async (): Promise<ExternalPermission[]> => {
    const repository = await getPermisionRepository();
    return repository.find();
}

export const getPermissionByIdRepo = async (id: string): Promise<ExternalPermission | null> => {
    const repository = await getPermisionRepository();
    return repository.findOne({ where: { externalPermissionId: id } });
}

export const savePermissionRepository = async (data: IExternalPermission): Promise<ExternalPermission> => {
    const repository = await getPermisionRepository();
    return await repository.save(data);
}