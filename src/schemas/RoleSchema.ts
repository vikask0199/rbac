import { z } from 'zod';
import { isValidName } from '../utils/zodHelper';

export const createRoleSchema = z.object({
    roleName: z.string().min(3, "Role name is required").refine(
        isValidName, {
        message: "Name must only contain alphabets and spaces"
    }
    ),
    createdBy: z.string().optional(),
    permissions: z.array(z.string()).optional(),
});

export const updateRoleSchema = z.object({
    roleName: z.string().optional(),
    createdBy: z.string().optional(),
    permissions: z.array(z.string()).optional(),
});


export const getRoleByNameSchema = z.object({
    roleName: z.string().min(3, "Role  name is required").refine(
        isValidName, {
        message: "Name must only contain alphabets and spaces"
    }
    )
});

export const deleteRoleByNameSchema = z.object({
    roleName: z.string().min(3, "Role name is required").refine(
        isValidName, {
        message: "Name must only contain alphabets and spaces"
    })
});