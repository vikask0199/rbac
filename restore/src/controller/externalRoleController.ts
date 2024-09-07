import { IExternalRole } from "../interface/ExternalRoleInterface";
import { Request, Response } from "express";
import { createRoleSvc, updateRoleSvc } from "../service/externalRoleService";
import { ServiceError } from "../utils/ServiceError";


export const createExternalRoleController = async (req: Request<{}, {}, IExternalRole>, res: Response): Promise<void> => {
    const reqBody = req.body

    try {
        const savedRecord = await createRoleSvc(reqBody)
        res.status(201).json({
            success: true,
            message: "Role created successfully",
            data: savedRecord,
        });
    } catch (error: any) {
        if (error instanceof ServiceError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}


export const updateExternalRoleController = async (req: Request<{ externalRoleId: string }, {}, IExternalRole>, res: Response): Promise<void> => {
    const { externalRoleId } = req.params;
    const reqBody = req.body;

    try {
        const updatedRecord = await updateRoleSvc(externalRoleId, reqBody)
        res.status(200).json({
            success: true,
            message: "Role updated successfully",
            data: updatedRecord,
        });
    } catch (error: any) {
        if (error instanceof ServiceError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}