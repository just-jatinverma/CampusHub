import { Request } from 'express';

// Simple local interface
interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'STUDENT' | 'FACULTY' | 'ADMIN';
  };
}

export function canAccessOwnOrByRole(req: AuthRequest, resourceOwnerId: string): boolean {
  if (!req.user) return false;

  if (req.user.role === 'STUDENT') {
    return req.user.id === resourceOwnerId;
  }

  if (req.user.role === 'FACULTY' || req.user.role === 'ADMIN') {
    return true;
  }

  return false;
}
