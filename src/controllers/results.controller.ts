import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const createResult = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get studentId, courseId, and grade from request body
  // 2. Validate required fields
  // 3. Verify student and course exist
  // 4. Get userId from authenticated request (req.user.id) for publishedById
  // 5. Create result record
  // 6. Return success response with created result
});

const getStudentResults = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get studentId from request params
  // 2. Verify student exists
  // 3. Fetch results for specified student with included course and publishedBy relations
  // 4. Return list of results
});

export { createResult, getStudentResults };
