import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const getStudentAttendance = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get the student ID from request parameters.
  // 2. The user making the request should be the student themselves or an admin/teacher.
  //    - Implement access control logic.
  // 3. Get course ID from request query to filter attendance by a specific course.
  // 4. Fetch all attendance records for the student.
  // 5. Return the attendance records.
});

const getStudentEnrollments = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get the student ID from request parameters.
  // 2. The user making the request should be the student themselves or an admin/teacher.
  //    - Implement access control logic.
  // 3. Fetch all courses the student is enrolled in.
  // 4. Return the list of enrolled courses.
});

export { getStudentAttendance, getStudentEnrollments };