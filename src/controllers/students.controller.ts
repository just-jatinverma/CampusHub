import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const getStudentAttendance = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  const student = await prisma.user.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new ApiError(400, 'student not found');
  }

  const attendance = await prisma.attendance.findMany({ where: { studentId } });

  return res.status(200).json(new ApiResponse(200, attendance, 'success'));
});

const getStudentEnrollments = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  const student = await prisma.user.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new ApiError(400, 'student not found');
  }

  const enrollments = await prisma.enrollment.findMany({ where: { studentId } });

  return res.status(200).json(new ApiResponse(200, enrollments, 'success'));
});

export { getStudentAttendance, getStudentEnrollments };
