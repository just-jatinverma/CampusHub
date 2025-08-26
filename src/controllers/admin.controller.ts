import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const getAllUsers = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get pagination parameters from request query (e.g., page, limit).
  // 2. Define default values for pagination if not provided.
  // 3. Calculate the offset for database query.
  // 4. Fetch users from the database using Prisma Client.
  //    - Use `findMany` with `skip` a
  // nd `take` for pagination.
  //    - Exclude sensitive fields like passwords.
  // 5. Get the total count of users for pagination metadata.
  // 6. Construct a response object with user data and pagination info.
  // 7. Send the response.
});

const updateUserRole = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get the user ID from request parameters (e.g., /api/v1/admin/users/:userId/role).
  // 2. Get the new role from the request body.
  // 3. Validate the input:
  //    - Check if the user ID is valid.
  //    - Check if the role is a valid role (e.g., 'STUDENT', 'TEACHER', 'ADMIN').
  // 4. Find the user in the database by their ID.
  // 5. If the user does not exist, throw a 404 ApiError.
  // 6. Update the user's role in the database.
  // 7. Return a success response with the updated user data.
});

export { getAllUsers, updateUserRole };