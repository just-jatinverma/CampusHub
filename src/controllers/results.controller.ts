import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const createResult = asyncHandler(async (req, res) => {
  // TODO: Validate request body
  // - Validate required fields: studentId, courseId, score/grade
  // - Validate score/grade format
  // TODO: Verify student and course
  // - Check if student exists
  // - Check if course exists
  // - Verify student is enrolled in course
  // TODO: Check existing result
  // - Verify no result exists for this student-course combination
  // TODO: Create result
  // - Create new result record with Prisma
  // - Include publisher information (admin)
  // TODO: Create notification
  // - Create notification for student about new result
  // TODO: Send response
  // - Return success response with created result
});

const getStudentResults = asyncHandler(async (req, res) => {
  // TODO: Validate student ID
  // - Get student ID from params
  // - Verify student exists
  // TODO: Handle query parameters
  // - Parse courseId filter if provided
  // - Parse semester/year filters if provided
  // TODO: Verify access permission
  // - Allow if user is admin
  // - Allow if user is the student themselves
  // - Throw error if unauthorized
  // TODO: Fetch results
  // - Query database for student's results
  // - Include course information
  // - Apply any filters
  // TODO: Send response
  // - Return success response with results array
  // - Include any relevant statistics (e.g., GPA)
});

export { createResult, getStudentResults };
