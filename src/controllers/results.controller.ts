import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const createResult = asyncHandler(async (req: any, res) => {
  const publishedById = req.user.id;
  const { grade, studentId, courseId } = req.body;

  if (!grade || !studentId || !courseId) {
    throw new ApiError(400, 'all fields are required');
  }

  const student = await prisma.user.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new ApiError(400, "student don't exist");
  }

  const course = await prisma.course.findUnique({ where: { id: courseId } });

  if (!course) {
    throw new ApiError(400, "course don't exist");
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: { studentId_courseId: { studentId, courseId } },
  });

  if (!enrollment) {
    throw new ApiError(400, 'student not enrolled in course');
  }

  const existingResult = await prisma.result.findFirst({ where: { studentId, courseId } });

  if (!existingResult) {
    throw new ApiError(400, 'result already added');
  }

  const result = await prisma.result.create({
    data: { studentId, courseId, publishedById, grade },
  });

  return res.status(200).json(new ApiResponse(200, result, 'success'));
});

const getStudentResults = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const { courseId } = req.body;

  if (!studentId || !courseId) {
    throw new ApiError(400, 'Both studentId and courseId are required');
  }

  const student = await prisma.user.findUnique({ where: { id: studentId } });
  if (!student) {
    throw new ApiError(404, 'Student not found');
  }

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: { studentId_courseId: { studentId, courseId } },
  });
  if (!enrollment) {
    throw new ApiError(400, 'Student not enrolled in this course');
  }

  const result = await prisma.result.findFirst({
    where: { studentId, courseId },
  });
  if (!result) {
    throw new ApiError(404, 'Result not found');
  }

  return res.status(200).json(new ApiResponse(200, result, 'success'));
});

export { createResult, getStudentResults };
