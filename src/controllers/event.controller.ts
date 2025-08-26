import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const createEvent = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get event details from request body (title, description, date, location, etc.).
  // 2. Get the author ID from the authenticated user (req.user).
  // 3. Validate the input.
  // 4. Create a new event in the database.
  // 5. generate notification
  // 6. Return the newly created event.
});

const getEvents = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Implement pagination (page, limit).
  // 2. Allow filtering by date range or other criteria.
  // 3. Fetch events from the database.
  // 4. Return a paginated list of events.
});

export { createEvent, getEvents };