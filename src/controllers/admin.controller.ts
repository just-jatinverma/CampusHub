import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const getAllUsers = asyncHandler(async (req, res) => {
  // TODO: Handle query parameters
  // - Parse pagination parameters (page, limit)
  // - Parse role filter if provided
  // - Parse search query (name/email)
  // TODO: Build query filters
  // - Create filter object based on role and search parameters
  // TODO: Fetch users
  // - Query database with pagination and filters
  // - Exclude sensitive information (password, refreshToken)
  // - Include user statistics (courses enrolled/created)
  // TODO: Send response
  // - Return success response with users array
  // - Include pagination metadata
  // - Include role-based statistics
});

const updateUserRole = asyncHandler(async (req, res) => {
  // TODO: Validate request
  // - Validate user ID from params
  // - Validate role from body (must be valid Role enum)
  // TODO: Find target user
  // - Query database for user by ID
  // - Throw error if user not found
  // TODO: Validate role change
  // - Prevent changing own role (admin can't change their own role)
  // - Ensure there's at least one admin remaining
  // TODO: Update user role
  // - Update user record with new role
  // TODO: Create notification
  // - Notify user about role change
  // TODO: Send response
  // - Return success response with updated user data
  // - Exclude sensitive information
});

export { getAllUsers, updateUserRole };
