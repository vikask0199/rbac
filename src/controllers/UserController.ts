import {Request, Response} from "express"

import { createUserSchema, updateUserSchema } from "../schemas/UserSchema";
import { createUserService, deleteUserService, getAllUsersService, getUserByIdService, updateUserService } from "../services/UserService";


export const createUserController = async (req: Request, res: Response) => {
    const parseResult = createUserSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json(parseResult.error);
    }
    try {
        const user = await createUserService(parseResult.data);
        return res.status(201).json(user);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUserController = async (req: Request, res: Response) => {
    const parseResult = updateUserSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json(parseResult.error);
    }
    try {
        const user = await updateUserService(parseResult.data);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUserController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const success = await deleteUserService(id);
        if (!success) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUserByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await getUserByIdService(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};


// export const updateUserRolesController = async (req: Request, res: Response) => {
//     const validation = updateUserRolesSchema.safeParse(req.body);
//     if (!validation.success) {
//         return res.status(400).json({ error: validation.error.message });
//     }

//     try {
//         const user = await updateUserRolesService(validation.data.userId, validation.data.roleIds, validation.data.overwrite);
//         return res.status(200).json(user);
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// };

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsersService();
        return res.status(200).json(users);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};