import { Request, Response } from 'express';
import { z } from 'zod';
import { createSuperAdminService, deleteSuperAdminService, getAllSuperAdminsService, getSuperAdminService, updateSuperAdminService } from '../services/SuperAdminService';

const superAdminSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    primaryEmail: z.string().email(),
    secondaryEmail: z.string().email(),
    password: z.string().min(6, 'Password should be at least 6 characters').optional(),
    isActive: z.boolean().optional(),
});

export const createSuperAdminController = async (req: Request, res: Response) => {
    const parsedData = superAdminSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json(parsedData.error.errors);
    }

    try {
        const superAdmin = await createSuperAdminService(parsedData.data);
        res.status(201).json({success: true, message: "Super Admin Created Successfully", data: superAdmin});
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSuperAdminController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedData = superAdminSchema.partial().safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json(parsedData.error.errors);
    }

    try {
        const updatedSuperAdmin = await updateSuperAdminService(Number(id), parsedData.data);
        if (!updatedSuperAdmin) {
            return res.status(404).json({ message: "SuperAdmin not found" });
        }
        res.status(200).json(updatedSuperAdmin);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const getSuperAdminController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const superAdmin = await getSuperAdminService(Number(id));
        if (!superAdmin) {
            return res.status(404).json({ message: "SuperAdmin not found" });
        }
        res.status(200).json(superAdmin);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllSuperAdminsController = async (_: Request, res: Response) => {
    try {
        const superAdmins = await getAllSuperAdminsService();
        res.status(200).json(superAdmins);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSuperAdminController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const success = await deleteSuperAdminService(Number(id));
        if (!success) {
            return res.status(404).json({ message: "SuperAdmin not found" });
        }
        res.status(200).json({ message: "SuperAdmin deleted successfully" });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};
