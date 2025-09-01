import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const getCourses = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get pagination parameters from query (page, limit)
  // 2. Set default values if not provided
  // 3. Fetch courses with included createdBy relation (name, role only)
  // 4. Order by createdAt descending
  // 5. Get total count for pagination metadata
  // 6. Return paginated response with courses and metadata
});

const createCourse = asyncHandler(async (req: any, res) => {
  // TODO:
  // 1. Get name and description from request body
  // 2. Validate required fields
  // 3. Get userId from authenticated request (req.user.id)
  // 4. Create course in database with createdById set to current user
  // 5. Return success response with created course
});

const getCourseMaterials = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get courseId from request params
  // 2. Verify course exists
  // 3. Fetch materials for specified course with included uploadedBy relation
  // 4. Order by createdAt descending
  // 5. Return list of course materials
});

const uploadCourseMaterial = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get courseId from request params
  // 2. Get title and fileUrl from request body
  // 3. Validate required fields
  // 4. Verify course exists
  // 5. Get userId from authenticated request (req.user.id)
  // 6. Create material record with courseId and uploadedById set to current user
  // 7. Return success response with created material
});

const markAttendance = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get courseId from request params
  // 2. Get studentId, status (PRESENT, ABSENT, LATE), and optional date from request body
  // 3. Validate required fields and status enum
  // 4. Verify course and student exist
  // 5. Get userId from authenticated request (req.user.id) for markedById
  // 6. Create or update attendance record
  // 7. Return success response
});

const getAttendance = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get courseId from request params
  // 2. Implement optional date filtering
  // 3. Fetch attendance records with included student and markedBy relations
  // 4. Return attendance list
});

const enrollInCourse = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get courseId from request params
  // 2. Get userId from authenticated request (req.user.id)
  // 3. Verify course exists
  // 4. Check if student is already enrolled (prevent duplicate enrollment)
  // 5. Create enrollment record with studentId and courseId
  // 6. Return success response
});

const getEnrollments = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get courseId from request params
  // 2. Fetch enrollments with included student relation
  // 3. Return list of enrollments
});

export {
  getCourses,
  createCourse,
  getCourseMaterials,
  uploadCourseMaterial,
  markAttendance,
  getAttendance,
  enrollInCourse,
  getEnrollments,
};
