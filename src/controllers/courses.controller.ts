import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const getCourses = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Implement pagination (page, limit).
  // 2. Fetch all courses from the database.
  // 3. Return a paginated list of courses.
});

const createCourse = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get course details from request body (name, code, description, teacherId).
  // 2. Validate the input.
  // 3. Check if a course with the same code already exists.
  // 4. Create the new course.
  // 5. Return the created course.
});

const getCourseMaterials = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get the course ID from request parameters.
  // 2. Fetch all materials for that course.
  // 3. Implement pagination for materials.
  // 4. Return the list of materials.
});

const uploadCourseMaterial = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get the course ID from request parameters.
  // 2. Handle file upload (e.g., using multer).
  // 3. Get file details (title, description) from request body.
  // 4. Save the file to a storage service (e.g., local, S3).
  // 5. Create a new course material record in the database with the file URL.
  // 6. Return the new course material record.
});

const markAttendance = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get course ID, student ID, and date/status from request body.
  // 2. Validate the input.
  // 3. Check if the student is enrolled in the course.
  // 4. Create or update the attendance record for the student for that date.
  // 5. Return a success message.
});

const getAttendance = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get course ID and student ID from request parameters.
  // 2. Fetch all attendance records for that student in that course.
  // 3. Return the attendance records.
});

const enrollInCourse = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get the course ID from request parameters.
  // 2. Get the student ID from the authenticated user (req.user).
  // 3. Check if the student is already enrolled.
  // 4. Create a new enrollment record in the database.
  // 5. Return a success message.
});

const getEnrollments = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get the course ID from request parameters.
  // 2. Fetch all students enrolled in that course.
  // 3. Implement pagination.
  // 4. Return the list of enrolled students.
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