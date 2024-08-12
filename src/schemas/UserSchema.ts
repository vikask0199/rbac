import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().optional(),
    isAccountActivated: z.boolean().optional(),
    createdBy: z.string().optional(),
    roles: z.array(z.string().uuid()).optional(),
    superAdminId: z.string().uuid().optional(),
});

export const updateUserSchema = createUserSchema.partial().extend({
    id: z.string().uuid("Invalid User ID")
});
