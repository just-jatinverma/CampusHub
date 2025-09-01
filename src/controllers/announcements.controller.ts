import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const createAnnouncement = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get title and body from request body
  // 2. Validate required fields
  // 3. Get userId from authenticated request (req.user.id)
  // 4. Create announcement in database with createdById set to current user
  // 5. Return success response with created announcement
});

const getAnnouncements = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get pagination parameters from query (page, limit)
  // 2. Set default values (page=1, limit=10) if not provided
  // 3. Calculate offset for database query
  // 4. Fetch announcements with included createdBy relation (name, role only)
  // 5. Order by createdAt descending
  // 6. Get total count for pagination metadata
  // 7. Return paginated response with announcements and metadata
});

export { createAnnouncement, getAnnouncements };
