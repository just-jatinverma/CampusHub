import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const createEvent = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get title, description, and date from request body
  // 2. Validate required fields
  // 3. Get userId from authenticated request (req.user.id)
  // 4. Create event with createdById set to current user
  // 5. Return success response with created event
});

const getEvents = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get pagination parameters from query (page, limit)
  // 2. Set default values if not provided
  // 3. Fetch events with included createdBy relation
  // 4. Optionally filter by date range
  // 5. Order by date descending
  // 6. Get total count for pagination metadata
  // 7. Return paginated list of events
});

export { createEvent, getEvents };
