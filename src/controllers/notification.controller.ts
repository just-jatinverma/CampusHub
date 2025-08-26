import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const getUserNotifications = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get the user ID from the authenticated user (req.user).
  // 2. Implement pagination (page, limit).
  // 3. Fetch all notifications for that user, newest first.
  // 4. Allow filtering by read/unread status.
  // 5. Return a paginated list of notifications.
});

const markNotificationAsRead = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get the notification ID from request parameters.
  // 2. Get the user ID from the authenticated user (req.user).
  // 3. Find the notification in the database.
  // 4. Verify that the notification belongs to the current user.
  // 5. Update the `isRead` status of the notification to `true`.
  // 6. Return a success response.
});

export { getUserNotifications, markNotificationAsRead };