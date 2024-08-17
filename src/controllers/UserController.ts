import { Request, Response } from "express";
import { IDeleteUser, IUpdateUser, IUser } from "../interfaces/IUser";
import { createUserSchema, deleteUserSchema, updateUserSchema } from "../schemas/UserSchema";
import { createUserService, deleteUserService, getAllUsersService, getUserByEmailService, updateUserService } from "../services/UserService";
import { ServiceError } from "../utils/ServiceError";


export const createUserController = async (req: Request<{}, {}, IUser>, res: Response) => {
    const parseResult = createUserSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(422).json({
            success: false,
            message: "Unprocessable Entity",
            errors: parseResult.error.errors,
        })
    }
    try {
        const user = await createUserService(parseResult.data);
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
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
                message: "Internal Server Error or Unexpected error",
                data: null,
            });
        }
    }
};

export const updateUserController = async (req: Request<{}, {}, IUpdateUser>, res: Response) => {
    const parsedResult = updateUserSchema.safeParse(req.body);

    if (!parsedResult.success) {
        return res.status(422).json({
            success: false,
            message: "Unprocessable Entity",
            errors: parsedResult.error.errors,
        })
    }
    try {
        const user = await updateUserService(parsedResult.data);
        return res.status(200).json({ success: true, message: "User updated successfully", data: user });
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
};

export const deleteUserController = async (req: Request<IDeleteUser, {}, {}>, res: Response) => {
    const { userEmail } = req.params;
    const parsedResult = deleteUserSchema.safeParse({userEmail});
    if (!parsedResult.success) {
        return res.status(422).json({
            success: false,
            message: "Unprocessable Entity",
            errors: parsedResult.error.errors,
        })
    }
    try {
        const deletedUser = await deleteUserService(parsedResult.data.userEmail)
        return res.status(200).json({ success: true, message: "User deleted successfully" });
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
                data: error.message
            });
        }
    }
};

export const getUserByEmailController = async (req: Request<IDeleteUser, {}, {}>, res: Response) => {
    const { userEmail } = req.params;
    const parsedResult = deleteUserSchema.safeParse({userEmail});
    if (!parsedResult.success) {
        return res.status(422).json({
            success: false,
            message: "Unprocessable Entity",
            errors: parsedResult.error.errors,
        })
    }
    try {
        const user = await getUserByEmailService(parsedResult.data.userEmail);
        return res.status(200).json(user);
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
};

export const getAllUsersController = async (req: Request<{}, {}, {}>, res: Response) => {
    try {
        const users = await getAllUsersService();
        return res.status(200).json({ data: users });
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
};