import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const getUserNotifications = asyncHandler(async (req, res) => {
  // TODO: Get authenticated user
  // - Get user ID from request (set by verifyJWT middleware)
  // TODO: Handle query parameters
  // - Parse pagination parameters
  // - Parse filter parameters (read/unread)
  // TODO: Fetch notifications
  // - Query database for user's notifications
  // - Apply read/unread filter if specified
  // - Sort by createdAt in descending order
  // TODO: Send response
  // - Return success response with notifications array
  // - Include unread count in response
  // - Include pagination metadata
});

const markNotificationAsRead = asyncHandler(async (req, res) => {
  // TODO: Get authenticated user
  // - Get user ID from request (set by verifyJWT middleware)
  // TODO: Validate notification ID
  // - Get notification ID from params
  // - Verify notification exists
  // - Verify notification belongs to user
  // TODO: Update notification
  // - Update notification read status to true
  // TODO: Send response
  // - Return success response with updated notification
});

export { getUserNotifications, markNotificationAsRead };
