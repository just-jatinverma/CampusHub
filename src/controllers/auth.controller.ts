import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const register = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get user details from request body (name, email, password, role).
  // 2. Validate input: check if user with the same email already exists.
  // 3. Hash the user's password.
  // 4. Create a new user in the database using Prisma Client.
  // 5. Generate JWT access and refresh tokens.
  // 6. Set the refresh token in an HTTPOnly cookie.
  // 7. Return the access token and user data in the response.
});

const login = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get email and password from the request body.
  // 2. Find the user by email in the database.
  // 3. If user is not found, throw a 401 Unauthorized error.
  // 4. Compare the provided password with the stored hashed password.
  // 5. If passwords do not match, throw a 401 Unauthorized error.
  // 6. Generate new JWT access and refresh tokens.
  // 7. Set the refresh token in an HTTPOnly cookie.
  // 8. Return the access token and user data in the response.
});

const getCurrentUser = asyncHandler(async (req, res) => {
  // TODO:
  // 1. The `auth.middleware.ts` should have already populated `req.user`.
  // 2. Get the user object from the request.
  // 3. Return the user's data (excluding sensitive fields like password).
});

export { register, login, getCurrentUser };