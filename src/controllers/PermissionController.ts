import { Request, Response } from "express";
import { IPermission, IUpdatePermissionName, IUpdatePermissionRole } from "../interfaces/IPermission";
import { createPermissionSchema, updatePermissionNameSchema, updatePermissionSchema } from "../schemas/PermissionSchema";
import { createPermissionSvc, deletePermissionSvc, getAllPermissionSvc, getPermissionByNameSvc, updatePermissionSvc } from "../services/PermissionService";
import { ServiceError } from "../utils/ServiceError";


export const createPermissionController = async (req: Request<{}, {}, IPermission>, res: Response) => {
    const parsedData = createPermissionSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(422).json({
            success: false,
            message: "Unprocessable Entity",
            errors: parsedData.error.errors,
        })
    }
    try {
        const addedRecords = await createPermissionSvc(parsedData.data)
        res.status(201).json({ success: true, message: "Permission Created Successfully", data: addedRecords });
    } catch (error: any) {
        if (error instanceof ServiceError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: error.data
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error or Unexpected error",
                data: null
            });
        }
    }
}

export const updatePermissionController = async (req: Request<IUpdatePermissionName, {}, IUpdatePermissionRole>, res: Response) => {
    const { permissionName } = req.params;
    const parsedParamsData = updatePermissionNameSchema.safeParse({ permissionName })

    if (!parsedParamsData.success) {
        return res.status(422).json({
            success: false,
            message: "Unprocessable Entity",
            errors: parsedParamsData.error.errors,
        })
    }

    const parsedReqBody = updatePermissionSchema.safeParse(req.body)
    if (!parsedReqBody.success) {
        return res.status(422).json({
            success: false,
            message: "Unprocessable Entity",
            errors: parsedReqBody.error.errors,
        })
    }

    try {
        const updatedRecords = await updatePermissionSvc(parsedParamsData.data.permissionName, parsedReqBody.data.roles)
        res.status(200).json({ success: true, message: "Permission updated successfully", data: updatedRecords });
    } catch (error: any) {
        if (error instanceof ServiceError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: error.data
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error or Unexpected error",
                data: null
            });
        }
    }
}

export const getPermissionByNameController = async (req: Request<IUpdatePermissionName, {}, {}>, res: Response) => {
    const { permissionName } = req.params;
    const parsedParamsData = updatePermissionNameSchema.safeParse({ permissionName })
    if (!parsedParamsData.success) {
        return res.status(422).json({
            success: false,
            message: "Unprocessable Entity",
            errors: parsedParamsData.error.errors,
        })
    }

    try {
        const permission = await getPermissionByNameSvc(parsedParamsData.data.permissionName)
        res.status(200).json({ success: true, data: permission });
    } catch (error: any) {
        if (error instanceof ServiceError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: error.data
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error or Unexpected error",
                data: null
            });
        }
    }
}

export const getAllPermissionsController = async (req: Request, res: Response) => {
    try {
        const permissions = await getAllPermissionSvc()
        res.status(200).json({ success: true, data: permissions });
    } catch (error: any) {
        if (error instanceof ServiceError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error or Unexpected error",
                data: null
            });
        }
    }
}

export const deletePermissionController = async (req: Request<IUpdatePermissionName, {}, {}>, res: Response) => {
    const { permissionName } = req.params
    const parsedParamsData = updatePermissionNameSchema.safeParse({ permissionName })
    if (!parsedParamsData.success) {
        return res.status(422).json({
            success: false,
            message: "Unprocessable Entity",
            errors: parsedParamsData.error.errors,
        })
    }

    try {
        const deletedRecords = await deletePermissionSvc(parsedParamsData.data.permissionName)
        res.status(200).json({ success: true, message: "Permission deleted successfully", data: deletedRecords });
    } catch (error: any) {
        if (error instanceof ServiceError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error or Unexpected error",
                data: null
            });
        }
    }
}