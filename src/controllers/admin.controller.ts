import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return res.status(200).json(new ApiResponse(200, users, 'success'));
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!id || !role) {
    throw new ApiError(400, 'both fields are required');
  }

  if (!['ADMIN', 'FACULTY', 'STUDENT'].includes(role)) {
    throw new ApiError(400, 'Invalid role');
  }

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new ApiError(400, 'User Not Found');
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { role },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return res.status(200).json(new ApiResponse(200, updatedUser, 'success'));
});

export { getAllUsers, updateUserRole };
