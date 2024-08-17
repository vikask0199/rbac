import { z } from 'zod';
import { isValidRoleAndPermission } from '../utils/zodHelper';

export const createPermissionSchema = z.object({
    permissionName: z.string().min(3, 'Permission name should be greater then 3 characters').max(50, "Permission name is required should be less than 50 characters").toLowerCase().refine(
        isValidRoleAndPermission, {
        message: "Name must only contain alphabets and dash(-)"
    }
    ),
    createdBy: z.string().uuid('Invalid UUID format').optional(),
    roles: z.array(z.string().min(3, 'Permission name should be greater then 3 characters').max(50, "Permission name is required should be less than 50 characters").toLowerCase()).optional()
});

export const updatePermissionSchema = z.object({
    roles: z.array(z.string().min(3, 'Permission name should be greater then 3 characters').max(50, "Permission name is required should be less than 50 characters").toLowerCase())
});

export const updatePermissionNameSchema = z.object({
    permissionName: z.string().min(3, 'Permission name should be greater then 3 characters').max(50, "Permission name is required should be less than 50 characters").toLowerCase().refine(
        isValidRoleAndPermission, {
        message: "Name must only contain alphabets and dash(-)"
    }
    ),
})