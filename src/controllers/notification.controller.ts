import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const getUserNotifications = asyncHandler(async (req: any, res) => {
  const userId = req.user.id;

  const notifications = await prisma.notification.findMany({ where: { userId, read: false } });

  return res.status(200).json(new ApiResponse(200, notifications, 'success'));
});

const markNotificationAsRead = asyncHandler(async (req: any, res) => {
  const userId = req.user.id;

  const { notificationId } = req.params;

  const notification = await prisma.notification.findUnique({ where: { id: notificationId } });

  if (!notification || notification.userId !== userId) {
    throw new ApiError(400, 'notification not found');
  }

  const updated = await prisma.notification.update({
    where: { id: notificationId },
    data: { read: true },
  });

  return res.status(200).json(new ApiResponse(200, updated, 'success'));
});

export { getUserNotifications, markNotificationAsRead };
