import { ISuperAdminBasicResponse, ISuperAdminRequest, ISuperAdminResponse } from '../interfaces/ISuperAdmin';
import { checkAnyOneEmailExistIntoDB, createSuperAdminRepo, deleteSuperAdminRepo, findSuperAdminByEmail, getAllSuperAdmins, getSuperAdminById, updateSuperAdminRepo } from '../repositories/SuperAdminRepository';

/**
 * Creates a new SuperAdmin and checks if either the primary or secondary email already exists
 * in either of the email columns (primary or secondary) in the repository.
 * 
 * This function verifies if the primary email is already used as either a primary or secondary email,
 * and if the secondary email is used as either a primary or secondary email. If any of these conditions
 * are met, it throws an error indicating that the user or email already exists. If neither email is found,
 * it proceeds to create a new SuperAdmin. Upon successful creation, it returns a basic response containing
 * the name and primary email of the newly created SuperAdmin.
 * 
 * @param data - An object containing the details of the SuperAdmin to be created. 
 *                This includes:
 *                - `name`: The name of the SuperAdmin.
 *                - `primaryEmail`: The primary email address of the SuperAdmin.
 *                - `secondaryEmail`: The secondary email address of the SuperAdmin.
 *                - `password` (optional): The password for the SuperAdmin account.
 *                - `isActive` (optional): A boolean indicating if the account is active.
 * 
 * @returns A promise that resolves to an object with the following properties:
 *          - `name`: The name of the newly created SuperAdmin.
 *          - `primaryEmail`: The primary email of the newly created SuperAdmin.
 * 
 * @throws Error if either email exists in any column or if the creation of the SuperAdmin fails.
 */
export const createSuperAdminService = async (data: ISuperAdminRequest): Promise<ISuperAdminBasicResponse> => {
    const isEmailExist = await checkAnyOneEmailExistIntoDB(data)
    
    if(isEmailExist){
        throw new Error('User or email already exists')
    }
    
    const newSuperAdmin = await createSuperAdminRepo(data);
    if (!newSuperAdmin) throw new Error('SuperAdmin creation failed');

    return {
        name: newSuperAdmin.name,
        primaryEmail: newSuperAdmin.primaryEmail,
    };
};

export const updateSuperAdminService = async (id: number, data: Partial<ISuperAdminRequest>): Promise<ISuperAdminResponse | null> => {
    const existingSuperAdmin = await findSuperAdminByEmail(data.primaryEmail || '');
    if (existingSuperAdmin && existingSuperAdmin.id !== id) {
        throw new Error('SuperAdmin with this email already exists');
    }

    const updatedSuperAdmin = await updateSuperAdminRepo(id, data);
    if (!updatedSuperAdmin) return null;

    return {
        name: updatedSuperAdmin.name,
        primaryEmail: updatedSuperAdmin.primaryEmail,
        secondaryEmail: updatedSuperAdmin.secondaryEmail,
        isActive: updatedSuperAdmin.isActive,
        role: updatedSuperAdmin.role,
        createdAt: updatedSuperAdmin.createdAt,
        updatedAt: updatedSuperAdmin.updatedAt,
    };
};

export const getSuperAdminService = async (id: number): Promise<ISuperAdminResponse | null> => {
    const superAdmin = await getSuperAdminById(id);
    if (!superAdmin) return null;

    return {
        name: superAdmin.name,
        primaryEmail: superAdmin.primaryEmail,
        secondaryEmail: superAdmin.secondaryEmail,
        isActive: superAdmin.isActive,
        role: superAdmin.role,
        createdAt: superAdmin.createdAt,
        updatedAt: superAdmin.updatedAt,
    };
};

export const getAllSuperAdminsService = async (): Promise<ISuperAdminBasicResponse[]> => {
    const superAdmins = await getAllSuperAdmins();
    return superAdmins.map((sa) => ({
        id: sa.id,
        name: sa.name,
        primaryEmail: sa.primaryEmail,
    }));
};

export const deleteSuperAdminService = async (id: number): Promise<boolean> => {
    return await deleteSuperAdminRepo(id);
};
