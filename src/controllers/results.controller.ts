import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';

const createResult = asyncHandler(async (req, res) => {
  // TODO:
  // 1. This should be an admin/teacher protected route.
  // 2. Get result details from request body (studentId, courseId, marks, grade).
  // 3. Validate the input.
  // 4. Check if the student is enrolled in the specified course.
  // 5. Create a new result record in the database.
  // 6. generate notification
  // 7. Return the created result.
});

const getStudentResults = asyncHandler(async (req, res) => {
  // TODO:
  // 1. Get the student ID from request parameters.
  // 2. The user making the request should be the student themselves or an admin/teacher.
  //    - Implement access control logic.
  // 3. Fetch all results for the specified student.
  // 4. Allow filtering by semester or course.
  // 5. Return the list of results.
});

export { createResult, getStudentResults };