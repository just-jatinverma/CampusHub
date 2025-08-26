import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const createAnnouncement = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get title and content from the request body.
  // 2. Get the author ID from the authenticated user (req.user).
  // 3. Validate the input (e.g., title and content are not empty).
  // 4. Create a new announcement in the database using Prisma Client.
  // 5. create notification for everyone
  // 6. Return a success response with the newly created announcement.
});

const getAnnouncements = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get pagination parameters from request query (e.g., page, limit).
  // 2. Define default values for pagination.
  // 3. Calculate the offset for the database query.
  // 4. Fetch announcements from the database, ordered by creation date.
  //    - Use `findMany` with `skip`, `take`, and `orderBy`.
  // 5. Get the total count of announcements for pagination metadata.
  // 6. Return a paginated response with announcements and pagination info.
});

export { createAnnouncement, getAnnouncements };