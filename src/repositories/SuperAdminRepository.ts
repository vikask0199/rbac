import { AppDataSource } from "../config/dbConfig";
import { ISuperAdminRequest, ISuperAdminResponse, ISuperAdminUpdateRequest } from "../interfaces/ISuperAdmin";
import { SuperAdmin } from "../models/SuperAdmin";

export const getSuperAdminRepository = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource.getRepository(SuperAdmin);
};

export const checkAnyOneEmailExistIntoDB = async (data: ISuperAdminRequest): Promise<SuperAdmin | null> => {
    const repository = await getSuperAdminRepository();
    const result = await repository.findOne({
        where: [
            { primaryEmail: data.primaryEmail },
            { secondaryEmail: data.secondaryEmail },
            { primaryEmail: data.secondaryEmail },
            { secondaryEmail: data.primaryEmail },
        ]
    })
    return result;
};


export const findSuperAdminByEmail = async (email: string): Promise<SuperAdmin | null> => {
    const repository = await getSuperAdminRepository();
    return await repository.findOne({
        where: [
            { primaryEmail: email },
            { secondaryEmail: email },
        ]
    });
};

export const getSuperAdminById = async (id: string): Promise<SuperAdmin | null> => {
    const repository = await getSuperAdminRepository();
    return await repository.findOneBy({ id: id });
}

export const createSuperAdminRepo = async (data: ISuperAdminRequest): Promise<SuperAdmin | null> => {
    const repository = await getSuperAdminRepository();
    return await repository.save(data);
};

export const updateSuperAdminRepo = async (recordToUpdate: ISuperAdminUpdateRequest, validateData: Partial<ISuperAdminUpdateRequest>): Promise<SuperAdmin | null> => {
    const repository = await getSuperAdminRepository();
    Object.assign(recordToUpdate, validateData);
    return await repository.save(recordToUpdate);
};

export const getAllSuperAdminsRepo = async (): Promise<SuperAdmin[]> => {
    const repository = await getSuperAdminRepository();
    return await repository.find();
};

export const deleteSuperAdminRepo = async (id: string): Promise<boolean> => {
    const repository = await getSuperAdminRepository();
    const deleteResult = await repository.delete(id);
    return deleteResult.affected !== 0;
};
