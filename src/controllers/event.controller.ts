import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const createEvent = asyncHandler(async (req: any, res) => {
  const { title, description, date } = req.body;

  if (!title?.trim() || !description?.trim() || !date) {
    throw new ApiError(400, 'all fields are required');
  }

  const userId = req.user.id;

  const event = await prisma.event.create({
    data: {
      title: title.trim(),
      description: description.trim(),
      date: new Date(date),
      createdById: userId,
    },
  });

  return res.status(200).json(new ApiResponse(200, event, 'success'));
});

const getEvents = asyncHandler(async (req, res) => {
  const events = await prisma.event.findMany({
    select: {
      title: true,
      description: true,
      date: true,
      createdBy: {
        select: {
          name: true,
        },
      },
    },
  });

  return res.status(200).json(new ApiResponse(200, events, 'success'));
});

export { createEvent, getEvents };
