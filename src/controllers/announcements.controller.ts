import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const createAnnouncement = asyncHandler(async (req, res) => {
  // TODO: Validate request body
  // - Validate required fields: title, body
  // - Ensure proper length and format
  // TODO: Get authenticated user info
  // - Get user ID from request (set by verifyJWT middleware)
  // - Verify user has proper role (faculty/admin - handled by middleware)
  // TODO: Create announcement
  // - Use Prisma to create new announcement
  // - Include createdById from authenticated user
  // TODO: Create notifications for relevant users
  // - Create notifications for all users about new announcement
  // TODO: Send response
  // - Return success response with created announcement data
});

const getAnnouncements = asyncHandler(async (req, res) => {
  // TODO: Handle query parameters
  // - Parse pagination parameters (page, limit)
  // - Parse any filter parameters
  // TODO: Fetch announcements
  // - Query database for announcements with pagination
  // - Sort by createdAt in descending order
  // - Include creator information (name only)
  // TODO: Send response
  // - Return success response with announcements array
  // - Include pagination metadata
});

export { createAnnouncement, getAnnouncements };
