import { z } from 'zod';
import "zod-openapi/extend"
import { isValidName, isValidRoleAndPermission } from '../utils/zodHelper';

export const createUserSchema = z.object({
    username: z.string().min(3, "Min 3 character").max(30, "Max 30 character").refine(
        isValidName, {
        message: "Name must only contain alphabets and spaces"
    }).optional().openapi({ example: "" }),
    userEmail: z.string().email("Invalid email address"),
    password: z.string(),
    roles: z.array(z.string().toLowerCase().refine(
        isValidRoleAndPermission,
        {
            message: "Name must only contain alphabets and dash(-)"
        }
    )).optional(),
});

export type example = z.infer<typeof createUserSchema>

export const updateUserSchema = z.object({
    id: z.string().uuid("Invalid User ID"),
    userEmail: z.string().email("Invalid email address"),
    username: z.string(),
    password: z.string(),
    roles: z.array(z.string().toLowerCase().refine(
        isValidRoleAndPermission,
        {
            message: "Name must only contain alphabets and dash(-)"
        }
    )).optional(),
});


export const deleteUserSchema = z.object ({
    userEmail: z.string().email("Invalid email address"),
})