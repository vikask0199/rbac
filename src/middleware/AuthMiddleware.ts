import { Request, Response, NextFunction } from 'express';
import { findUserById } from '../services/UserService';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;  // Assuming user ID is extracted from a token
    const user = await findUserById(userId);
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
};
