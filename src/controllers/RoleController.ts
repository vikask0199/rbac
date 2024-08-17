import { Request, Response } from "express";
import { IGetRoleByName, IRole } from "../interfaces/IRole";
import { createRoleSchema, deleteRoleByNameSchema, getRoleByNameSchema, updateRoleSchema } from "../schemas/RoleSchema";
import { createRoleService, deleteRoleByRoleNameService, getAllRolesService, getRoleByRoleName, updateRoleService } from "../services/RoleService";


export const createRoleController = async (req: Request<{}, {}, IRole>, res: Response) => {
    const parsedData = createRoleSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(422).json({
            success: false,
            message: "Unprocessable Entity",
            errors: parsedData.error.errors,
        });
    }
    try {
        const role = await createRoleService(parsedData.data);
        res.status(201).json({ success: true, data: role });
    } catch (error: any) {
        if (error.message === "One or more of the provided permissions do not exist.") {
            res.status(400).json({ success: false, message: error.message });
        } else if (error.message === "Role with the same name already exists.") {
            res.status(400).json({ success: false, message: error.message });
        }
        else {
            res.status(500).json({ success: false, message: "Internal Server Error or Unexpected error" });
        }
    }
}

export const updateRoleController = async (req: Request, res: Response) => {
    try {
        const parsedData = updateRoleSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(422).json({
                success: false,
                message: "Unprocessable Entity",
                errors: parsedData.error.errors,
            });
        }
        const updatedRole = await updateRoleService(req.params.roleName, parsedData.data);
        res.status(200).json({ success: true, message: 'Role is updated successfully', data: updatedRole });
    } catch (error: any) {
        if (error.message === 'Role not found') {
            res.status(404).json({ success: false, message: error.message });
        } else if (error.message === 'One or more permissions not found') {
            res.status(400).json({ success: false, message: error.message });
        } else {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

export const getRoleByRoleNameController = async (req: Request<{}, {}, IGetRoleByName>, res: Response) => {
    const parsedData = getRoleByNameSchema.safeParse(req.body)
    if(!parsedData.success){
        return res.status(422).json({
            success: false,
            message: "Unprocessable Entity",
            errors: parsedData.error.errors,
        })
    }
    try {
        const roleDate = await getRoleByRoleName(parsedData.data.roleName)
        res.status(200).json({success: true, data: roleDate});
    } catch (error: any) {
        if(error.message === "Role not found") {
            res.status(404).json({ success: false, message: error.message });
        }
        else{
            res.status(500).json({ success: false, message: "Internal Server Error or Unexpected error" });
        }
    }
}

export const getAllRolesController = async (req: Request, res: Response) => {
    try {
        const roles = await getAllRolesService();
        res.status(200).json(roles);
    } catch (error: any) {
        if(error.message === "No roles found"){
            res.status(404).json({ success: false, message: error.message });
        }
        else{
            res.status(500).json({ success: false, message: "Internal Server Error or Unexpected error" });
        }
    }
}


export const deleteRoleController = async (req: Request, res: Response) => {
    try {
        const parsedData = deleteRoleByNameSchema.safeParse(req.params)
        if(!parsedData.success){
            return res.status(422).json({
                success: false,
                message: "Unprocessable Entity",
                errors: parsedData.error.errors,
            })
        }
        console.log(parsedData)
        const success = await deleteRoleByRoleNameService(parsedData.data.roleName);
        res.status(200).send({success: true, message: "Role deleted successfully"});
    } catch (error: any) {
        if (error.message === 'Role not found') {
            res.status(404).json({success: false, message: error.message });
        } else if (error.message === 'Cannot delete role because it is associated with one or more permissions.') {
            res.status(400).json({success: false, message: error.message });
        } else{
            res.status(500).json({ success: false, message: error.message });
        } 
    }
}