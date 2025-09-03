import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const createAnnouncement = asyncHandler(async (req: any, res) => {
  const { title, body } = req.body;
  const userId = req.user.id;

  if (!title || !title.trim() || !body || !body.trim()) {
    throw new ApiError(400, 'both title and body required');
  }

  const announcement = await prisma.announcement.create({
    data: {
      title: title.trim(),
      body: body.trim(),
      createdById: userId,
    },
  });

  return res.status(200).json(new ApiResponse(200, announcement, 'success'));
});

const getAnnouncements = asyncHandler(async (req, res) => {
  const announcement = await prisma.announcement.findMany({
    select: {
      title: true,
      body: true,
      createdBy: {
        select: {
          name: true,
        },
      },
    },
  });

  return res.status(200).json(new ApiResponse(200, announcement, 'success'));
});

export { createAnnouncement, getAnnouncements };
