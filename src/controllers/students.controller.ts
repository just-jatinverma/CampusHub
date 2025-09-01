import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const getStudentAttendance = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get studentId from request params
  // 2. Verify student exists
  // 3. Check if current user has permission to view this data
  // 4. Fetch attendance records for specified student with included course relation
  // 5. Optionally filter by course or date range
  // 6. Return attendance list
});

const getStudentEnrollments = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get studentId from request params
  // 2. Verify student exists
  // 3. Check if current user has permission to view this data
  // 4. Fetch enrollments for specified student with included course relation
  // 5. Return list of enrollments
});

export { getStudentAttendance, getStudentEnrollments };
