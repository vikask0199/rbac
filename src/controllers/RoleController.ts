import { Request, Response } from "express";
import { createRoleSchema, updateRoleSchema } from "../schemas/RoleSchema";
import { createRoleService, deleteRoleService, getAllRolesService, getRoleByIdService, updateRoleService } from "../services/RoleService";


export const createRoleController = async (req: Request, res: Response) => {
    const parsedData = createRoleSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error.errors });
    }

    try {
        const role = await createRoleService(parsedData.data);
        res.status(201).json(role);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getRoleByIdController = async (req: Request, res: Response) => {
    try {
        const role = await getRoleByIdService(req.params.id);
        if (!role) {
            return res.status(404).json({ error: "Role not found" });
        }
        res.status(200).json(role);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllRolesController = async (req: Request, res: Response) => {
    try {
        const roles = await getAllRolesService();
        res.status(200).json(roles);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const updateRoleController = async (req: Request, res: Response) => {
    const parsedData = updateRoleSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error.errors });
    }

    try {
        const role = await updateRoleService(parsedData.data);
        if (!role) {
            return res.status(404).json({ error: "Role not found" });
        }
        res.status(200).json(role);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteRoleController = async (req: Request, res: Response) => {
    try {
        const success = await deleteRoleService(req.params.id);
        if (!success) {
            return res.status(404).json({ error: "Role not found or cannot be deleted" });
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}