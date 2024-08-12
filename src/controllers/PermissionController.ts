import { createPermissionSchema, updatePermissionSchema } from "../schemas/PermissionSchema";
import { createPermissionService, deletePermissionService, getAllPermissionsService, getPermissionByIdService, updatePermissionService } from "../services/PermissionService";
import { Request, Response } from "express";


export const createPermissionController = async (req: Request, res: Response) => {
    const parsedData = createPermissionSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error.errors });
    }

    try {
        const permission = await createPermissionService(parsedData.data);
        res.status(201).json(permission);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const getPermissionByIdController = async (req: Request, res: Response) => {
    try {
        const permission = await getPermissionByIdService(req.params.id);
        if (!permission) {
            return res.status(404).json({ error: "Permission not found" });
        }
        res.status(200).json(permission);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllPermissionsController = async (req: Request, res: Response) => {
    try {
        const permissions = await getAllPermissionsService();
        res.status(200).json(permissions);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const updatePermissionController = async (req: Request, res: Response) => {
    const parsedData = updatePermissionSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error.errors });
    }

    try {
        const permission = await updatePermissionService(parsedData.data);
        if (!permission) {
            return res.status(404).json({ error: "Permission not found" });
        }
        res.status(200).json(permission);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const deletePermissionController = async (req: Request, res: Response) => {
    try {
        const success = await deletePermissionService(req.params.id);
        if (!success) {
            return res.status(404).json({ error: "Permission not found or cannot be deleted" });
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}