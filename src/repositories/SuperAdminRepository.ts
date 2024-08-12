import { AppDataSource } from "../config/dbConfig";
import { ISuperAdminRequest } from "../interfaces/ISuperAdmin";
import { SuperAdmin } from "../models/SuperAdmin";

export const getSuperAdminRepository = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource.getRepository(SuperAdmin);
};

export const findSuperAdminByEmail = async (email: string): Promise<SuperAdmin | null> => {
    const repository = await getSuperAdminRepository();
    return await repository.findOne({
        where: [
            { primaryEmail: email },
            { secondryEmail: email },
        ]
    });
};

export const createSuperAdminRepo = async (data: ISuperAdminRequest): Promise<SuperAdmin | null> => {
    const repository = await getSuperAdminRepository();

    const existingSuperAdmin = await findSuperAdminByEmail(data.primaryEmail);
    if (existingSuperAdmin) {
        throw new Error('SuperAdmin with this email already exists');
    }

    return await repository.save(repository.create(data));
};

export const updateSuperAdminRepo = async (id: number, data: Partial<ISuperAdminRequest>): Promise<SuperAdmin | null> => {
    const repository = await getSuperAdminRepository();
    const recordToUpdate = await repository.findOneBy({ id });

    if (!recordToUpdate) {
        return null;
    }

    Object.assign(recordToUpdate, data);
    return await repository.save(recordToUpdate);
};

export const getSuperAdminById = async (id: number): Promise<SuperAdmin | null> => {
    const repository = await getSuperAdminRepository();
    return await repository.findOneBy({ id });
};

export const getAllSuperAdmins = async (): Promise<SuperAdmin[]> => {
    const repository = await getSuperAdminRepository();
    return await repository.find();
};

export const deleteSuperAdminRepo = async (id: number): Promise<boolean> => {
    const repository = await getSuperAdminRepository();
    const deleteResult = await repository.delete(id);
    return deleteResult.affected !== 0;
};
