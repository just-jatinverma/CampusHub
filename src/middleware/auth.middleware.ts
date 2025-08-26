import { ApiError } from '../utils/apiError';
import { asyncHandler } from '../utils/asyncHandler';
import { constants } from '../config/constants';
import prisma from '../config/db';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    name: string;
    email: string;
    role:string;
    createdAt: Date;
    updatedAt: Date;
  };
}
interface IDecodedToken extends JwtPayload {
  userId: number; // Prisma usually uses "id" (Int) instead of "_id"
}

export const verifyJWT = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        throw new ApiError(401, 'unauthorized request');
      }

      const decodedToken = jwt.verify(
        token,
        constants.accessTokenSecret as string
      ) as IDecodedToken;

      const user = await prisma.user.findUnique({
        where: { id: decodedToken.userId },
        select: {
          id: true,
          name: true,
          email: true,
          role:true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        throw new ApiError(401, 'unauthorized request');
      }

      req.user = user;

      next();
    } catch (error) {
      throw new ApiError(401, 'Invalid access token');
    }
  }
);
