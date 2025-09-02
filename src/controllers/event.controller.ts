import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const createEvent = asyncHandler(async (req, res) => {
  // TODO: Validate request body
  // - Validate required fields: title, description, date
  // - Ensure date is in future
  // - Validate date format
  // TODO: Get authenticated user
  // - Get user ID from request (set by verifyJWT middleware)
  // - Verify faculty/admin role (handled by middleware)
  // TODO: Create event
  // - Create new event with Prisma
  // - Set createdById to authenticated user
  // TODO: Create notifications
  // - Create notifications for all users about new event
  // TODO: Send response
  // - Return success response with created event data
});

const getEvents = asyncHandler(async (req, res) => {
  // TODO: Handle query parameters
  // - Parse pagination parameters (page, limit)
  // - Parse date range filters
  // TODO: Build query filters
  // - Create date range filter if provided
  // - Filter out past events if requested
  // TODO: Fetch events
  // - Query database with pagination and filters
  // - Include creator information
  // - Sort by date
  // TODO: Send response
  // - Return success response with events array
  // - Include pagination metadata
});

export { createEvent, getEvents };
