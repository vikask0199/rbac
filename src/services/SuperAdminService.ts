import { validate as uuidValidate } from 'uuid';
import { ISuperAdminRequest, ISuperAdminResponse, ISuperAdminUpdateRequest } from '../interfaces/ISuperAdmin';
import { SuperAdmin } from '../models/SuperAdmin';
import { checkAnyOneEmailExistIntoDB, createSuperAdminRepo, deleteSuperAdminRepo, getAllSuperAdminsRepo, getSuperAdminById, updateSuperAdminRepo } from '../repositories/SuperAdminRepository';

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
export const createSuperAdminService = async (data: ISuperAdminRequest): Promise<ISuperAdminResponse> => {
    const isEmailExist = await checkAnyOneEmailExistIntoDB(data)
    
    if(isEmailExist){
        throw new Error('exists')
    }
    
    const newSuperAdmin = await createSuperAdminRepo(data);
    if (!newSuperAdmin) throw new Error('something');

    return {
        name: newSuperAdmin.name,
        primaryEmail: newSuperAdmin.primaryEmail,
        secondaryEmail: newSuperAdmin.secondaryEmail,
        isActive: newSuperAdmin.isActive,
        role: newSuperAdmin.role,
        createdAt: newSuperAdmin.createdAt,
        updatedAt: newSuperAdmin.updatedAt
    };
};

export const updateSuperAdminService = async (id: string, dataToUpdate: Partial<ISuperAdminUpdateRequest>): Promise<ISuperAdminResponse | null> => {
    if (!uuidValidate(id)) {
        throw new Error('invalid');
    }
    const existingSuperAdmin = await getSuperAdminById(id);

    if (!existingSuperAdmin) {
        throw new Error('not found');
    }
    if(JSON.stringify(existingSuperAdmin) === JSON.stringify(dataToUpdate)){
        throw new Error('No change detected');
    }
    const updatedSuperAdmin = await updateSuperAdminRepo(existingSuperAdmin, dataToUpdate);
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

export const getSuperAdminService = async (id: string): Promise<ISuperAdminResponse | null> => {
    if (!uuidValidate(id)) {
        throw new Error('invalid');
    }
    const superAdmin = await getSuperAdminService(id);
    if (!superAdmin) {
        throw new Error('not found');
    }
    return superAdmin
};

export const getAllSuperAdminsService = async (): Promise<SuperAdmin[]> => {
    const superAdmins = await getAllSuperAdminsRepo();
    if(superAdmins.length > 0) {
        return superAdmins
    }
    throw new Error('No records found');
};

export const deleteSuperAdminService = async (id: string): Promise<boolean> => {
    if (!uuidValidate(id)) {
        throw new Error('invalid');
    }
    const superAdmin = await getSuperAdminService(id);
    if (!superAdmin) {
        throw new Error('not found');
    }
    return await deleteSuperAdminRepo(id);
};
