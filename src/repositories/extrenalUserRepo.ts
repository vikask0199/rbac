import { postgresDataSource } from "../config/dbConfig";
import { ExternalUser } from "../models/ExternalUser";




export const getExternalUserRepository = async () => {
    if (!postgresDataSource.isInitialized) {
        await postgresDataSource.initialize();
    }
    return postgresDataSource.getRepository(ExternalUser);
}



export const getAllExternalUserRepo = async (): Promise<ExternalUser[]> => {
    const repository = await getExternalUserRepository();
    return repository.find();
}


export const getExternalUserByEmailRepo = async (email: string): Promise<ExternalUser | null> => {
    const repository = await getExternalUserRepository();
    return repository.findOne({
        where: { email: email }
    });
}


export const getExternalUserByIdRepo = async (id: string): Promise<ExternalUser | null> => {
    const repository = await getExternalUserRepository();
    return repository.findOne({
        where: { extUserId: id },
        relations: ['organizationProfile']
    })
}


export const saveExternalUserRepo = async (data: ExternalUser): Promise<ExternalUser> => {
    const repository = await getExternalUserRepository();
    return repository.save(data);
}