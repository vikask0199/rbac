import { z } from 'zod';

export const createPermissionSchema = z.object({
    name: z.string().min(1, "Permission name is required"),
    createdBy: z.string().optional(),
});

export const updatePermissionSchema = z.object({
    id: z.string().uuid("Invalid UUID"),
    name: z.string().optional(),
    createdBy: z.string().optional(),
});