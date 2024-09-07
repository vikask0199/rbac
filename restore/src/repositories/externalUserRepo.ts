import { postgresDataSource } from "../config/dbConfig"
import { ExternalUser } from "../models/ExternalUser";



export const getExternalUserRepository = async () => {
    if (!postgresDataSource.isInitialized) {
        await postgresDataSource.initialize();
    }
    return postgresDataSource.getRepository(ExternalUser)
}


export const saveExternalUser = async (data: ExternalUser): Promise<ExternalUser> => {
    const repository = await getExternalUserRepository();
    return repository.save(data);
}

export const getExternalUserById = async (id: string): Promise<ExternalUser | null> => {
    const repository = await getExternalUserRepository();
    const data = await repository.findOne({
        where: { externalUserId: id },
        relations: ["orgProfile"],
    })
    return data;
}

export const getExternalUserByEmail = async (email: string): Promise<ExternalUser | null> => {
    const repository = await getExternalUserRepository();
    const data = await repository.findOne({
        where: { externalUserEmail: email },
        relations: ["orgProfile"],
    })
    return data;
}
