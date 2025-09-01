import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const getAllUsers = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get pagination parameters from query (page, limit)
  // 2. Set default values (page=1, limit=10) if not provided
  // 3. Fetch users from database with pagination using skip/take
  // 4. Use select to exclude password and refreshToken fields
  // 5. Include count of total users for pagination metadata
  // 6. Return paginated response with user list and metadata
});

const updateUserRole = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get userId from request params
  // 2. Get new role from request body
  // 3. Validate role value (must be ADMIN, FACULTY, or STUDENT)
  // 4. Check if user exists
  // 5. Update user role in database using prisma.user.update
  // 6. Return updated user data (excluding sensitive fields)
});

export { getAllUsers, updateUserRole };
