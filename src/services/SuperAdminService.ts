import { createSuperAdminRepo, updateSuperAdminRepo, getSuperAdminById, getAllSuperAdmins, deleteSuperAdminRepo, findSuperAdminByEmail } from '../repositories/SuperAdminRepository';
import { ISuperAdminRequest, ISuperAdminResponse, ISuperAdminBasicResponse } from '../interfaces/ISuperAdmin';

export const createSuperAdminService = async (data: ISuperAdminRequest): Promise<ISuperAdminBasicResponse> => {
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
        secondryEmail: updatedSuperAdmin.secondryEmail,
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
        secondryEmail: superAdmin.secondryEmail,
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
