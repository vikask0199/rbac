import { Request, Response, NextFunction } from 'express';

export const rolesGuard = (requiredPermissions: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { roles } = req.user;
        const userPermissions = roles.reduce((acc: string[], role) => {
            return [...acc, ...role.permissions.map(permission => permission.name)];
        }, []);

        const hasPermission = requiredPermissions.every(permission => userPermissions.includes(permission));
        if (!hasPermission) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
