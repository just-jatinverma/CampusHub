import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const getUserNotifications = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get userId from authenticated request (req.user.id)
  // 2. Fetch notifications for the current user
  // 3. Order by createdAt descending
  // 4. Return list of notifications
});

const markNotificationAsRead = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get notification ID from request params
  // 2. Verify notification exists and belongs to current user
  // 3. Update notification's read status to true
  // 4. Return success response
});

export { getUserNotifications, markNotificationAsRead };
