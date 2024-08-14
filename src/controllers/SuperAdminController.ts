import { Request, Response } from 'express';
import { SuperAdminSchema, SuperAdminUpdateSchema } from '../schemas/SuperAdminSchema';
import { createSuperAdminService, deleteSuperAdminService, getAllSuperAdminsService, getSuperAdminService, updateSuperAdminService } from '../services/SuperAdminService';
import { ISuperAdminRequest, ISuperAdminUpdateRequest } from '../interfaces/ISuperAdmin';

export const createSuperAdminController = async (req: Request<{}, {}, ISuperAdminRequest>, res: Response) => {
    try {
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({ success: false, message: "Bad Request" });
        }

        const parsedData = SuperAdminSchema.safeParse(req.body);

        if (!parsedData.success) {
            return res.status(400).json({
                success: false,
                message: "Unprocessable Entity",
                errors: parsedData.error.errors,
            });
        }
        const superAdmin = await createSuperAdminService(parsedData.data);
        res.status(201).json({success: true, message: "Super Admin Created Successfully", data: superAdmin});
    } catch (error:any) {
        if(error.message === 'exists'){
            res.status(409).json({success: false, message: "Email already exists" });
        }else if(error.message === 'something'){
            res.status(400).json({success: false, message: "Something went wrong" });
        }
        else{
            res.status(500).json({success: false, message: "Internal Server Error or Unexpected error"});
        }
    }
};

export const updateSuperAdminController = async (req: Request<{id: string}, {}, ISuperAdminUpdateRequest>, res: Response) => {
    try {
        const { id } = req.params;
        
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({ success: false, message: "Bad Request" });
        }

        const parsedData = SuperAdminUpdateSchema.safeParse(req.body);

        if (!parsedData.success) {
            return res.status(400).json({
                success: false,
                message: "Unprocessable Entity",
                errors: parsedData.error.errors,
            });
        }

        const updatedSuperAdmin = await updateSuperAdminService(id, parsedData.data);
        if (!updatedSuperAdmin) {
            return res.status(403).json({ message: "Failed to update super admin credentials" });
        }
        res.status(200).json({success: true, message:"Record Updated Successfully", data: updatedSuperAdmin});
    } catch (error:any) {
        if(error.message === 'not found' || error.message === 'invalid'){
            res.status(404).json({ message: "Super Admin not found" });
        }
        else if(error.message === 'No change detected'){
            res.status(409).json({ message: "No change detected" });
        }
        else{
            res.status(500).json({success: false, message: "Internal Server Error or Unexpected error"});
        }
    }
};


export const getSuperAdminByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const superAdmin = await getSuperAdminService(id);
        if (!superAdmin) {
            return res.status(404).json({success: false, message: "SuperAdmin not found" });
        }
        res.status(200).json({success: true, data: superAdmin});
    } catch (error: any) {
        if(error.message === 'not found' || error.message === 'invalid'){
            res.status(404).json({ message: "Super Admin not found" });
        }else{
            res.status(500).json({success: false, message: "Internal Server Error or Unexpected error"});
        }
    }
};

export const getAllSuperAdminsController = async (req: Request, res: Response) => {
    try {
        console.log("controller")
        const superAdmins = await getAllSuperAdminsService();
        res.status(200).json({success: true, data: superAdmins});
    } catch (error: any) {
        res.status(500).json({success: false, message: error.message });
    }
};

export const deleteSuperAdminController = async (req: Request, res: Response) => {
    res.status(400).json({success: false, message: "This facilty is currently disabled please contact with developer or maintainer" })
    // const { id } = req.params;
    // try {
    //     const success = await deleteSuperAdminService(id);
    //     if (!success) {
    //         return res.status(404).json({ message: "SuperAdmin not found" });
    //     }
    //     res.status(200).json({ message: "SuperAdmin deleted successfully" });
    // } catch (error: any) {
    //     if(error.message === 'not found' || error.message === 'invalid'){
    //         res.status(404).json({ message: "Super Admin not found" });
    //     }else{
    //         res.status(500).json({success: false, message: "Internal Server Error or Unexpected error"});
    //     }
    // }
};
