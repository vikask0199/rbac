import { z } from 'zod';
import "zod-openapi/extend"

export const createUserSchema = z.object({
    name: z.string().min(1).openapi({example: "Harsh M"}),
    email: z.string().email("Invalid email address"),
    password: z.string().optional(),
    isAccountActivated: z.boolean().optional(),
    createdBy: z.string().optional(),
    roles: z.array(z.string().uuid()).optional(),
    superAdminId: z.string().uuid().optional(),
    dob: z.string().datetime().optional()
});

export type example = z.infer<typeof createUserSchema>

export const updateUserSchema = createUserSchema.partial().extend({
    id: z.string().uuid("Invalid User ID")
});