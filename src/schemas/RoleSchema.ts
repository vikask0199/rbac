// import { z } from 'zod';

// export const RoleSchema = z.object({
//     id: z.number().optional(),
//     name: z.string(),
//     createdAt: z.date().optional(),
//     updatedAt: z.date().optional(),
//     createdBy: z.string().optional(),
//     permissions: z.array(z.string()).optional(),
//     users: z.array(z.string()).optional(),
// });

// export type RoleType = z.infer<typeof RoleSchema>;



// export const createRoleSchema = z.object({
    //     id: z.string().uuid('Invalid role ID').optional(),
    //     name: z.string().min(1, 'Role name is required'),
    //     createdBy: z.string().optional(),
    //     permissions: z.array(z.string().uuid('Invalid permission ID')).optional(),
    // });
    
    // export const updateRolePermissionsSchema = z.object({
        //     roleId: z.string().uuid('Invalid role ID'),
        //     permissionIds: z.array(z.string().uuid('Invalid permission ID')),
        // });
        
import { z } from 'zod';

export const createRoleSchema = z.object({
    name: z.string().min(1, "Role name is required"),
    createdBy: z.string().optional(),
    permissions: z.array(z.string().uuid("Invalid UUID")).optional(),
});

export const updateRoleSchema = z.object({
    id: z.string().uuid("Invalid UUID"),
    name: z.string().optional(),
    createdBy: z.string().optional(),
    permissions: z.array(z.string().uuid("Invalid UUID")).optional(),
});