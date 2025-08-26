import { ApiError } from '../utils/apiError';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export const checkRole = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      throw new ApiError(403, 'Forbidden: Insufficient permissions');
    }

    next();
  };
};