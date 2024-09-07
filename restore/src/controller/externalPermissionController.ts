import { Request, Response } from "express"
import { ServiceError } from "../utils/ServiceError";
import { createPermissionSvc } from "../service/externalPermissionService";
import { IExternalPermission } from "../interface/ExternalPermission";



export const createExternalPermissionController = async (req: Request<{},{}, IExternalPermission>, res: Response): Promise<void> => {
    const reqBody = req.body
    try {
        const createdPermission = await createPermissionSvc(reqBody)
        res.status(201).json({
            success: true,
            message: "Permission created successfully",
            data: createdPermission,
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