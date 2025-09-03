import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/db';
import { uploadOnImageKit } from '../utils/imagekit';

const getCourses = asyncHandler(async (req, res) => {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      createdBy: {
        select: {
          name: true,
        },
      },
      createdAt: true,
    },
  });

  return res.status(200).json(new ApiResponse(200, courses, 'success'));
});

const createCourse = asyncHandler(async (req: any, res) => {
  // TODO: Validate request body
  // - Validate required fields: name, description
  // - Ensure proper format and length
  // TODO: Get authenticated user info
  // - Get user ID from request (set by verifyJWT middleware)
  // - Verify admin role (handled by middleware)
  // TODO: Create course
  // - Use Prisma to create new course
  // - Set createdById to authenticated user's ID
  // TODO: Send response
  // - Return success response with created course data

  const { id: createdById } = req.user;

  const { name, description } = req.body;

  if (!name?.trim() || !description?.trim()) {
    throw new ApiError(400, 'Name and description both required');
  }

  const courseName = name.trim();

  const existingCourse = await prisma.course.findFirst({
    where: { name: { equals: courseName, mode: 'insensitive' } },
  });

  if (existingCourse) {
    throw new ApiError(409, 'A course with this name already exists');
  }

  const course = await prisma.course.create({
    data: {
      name: courseName,
      description: description.trim(),
      createdById: createdById,
    },
  });

  return res.status(201).json(new ApiResponse(201, course, 'Course created successfully'));
});

const getCourseMaterials = asyncHandler(async (req: any, res) => {
  const userId = req.user.id;
  const { courseId } = req.params;

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { Material: { select: { title: true, fileUrl: true } } },
  });

  if (!course) {
    throw new ApiError(400, 'course not found');
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId: userId,
        courseId,
      },
    },
  });

  if (!enrollment) {
    throw new ApiError(400, 'not enrolled in course');
  }

  return res.status(200).json(new ApiResponse(200, course.Material, 'success'));
});

const uploadCourseMaterial = asyncHandler(async (req: any, res) => {
  // TODO: Validate request
  // - Validate courseId from params
  // - Validate file upload in request
  // - Check file type and size restrictions
  // TODO: Verify course
  // - Check if course exists
  // - Verify user is faculty for this course
  // TODO: Handle file upload
  // - Process file upload
  // - Store file in appropriate storage
  // TODO: Create material record
  // - Create new material record in database
  // - Include file metadata and course association
  // - Set uploader to current user
  // TODO: Create notification
  // - Notify enrolled students about new material
  // TODO: Send response
  // - Return success response with material details

  const { courseId } = req.params;
  const { title } = req.body;
  if (!title || !title.trim()) {
    throw new ApiError(400, 'title required');
  }

  if (!req.file?.path) {
    throw new ApiError(400, 'file not found');
  }

  if (!courseId) {
    throw new ApiError(400, 'courseId not found');
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  const uploadedFile = await uploadOnImageKit(req.file.path);

  if (!uploadedFile?.url) {
    throw new ApiError(500, 'File upload failed');
  }

  const material = await prisma.material.create({
    data: {
      title: title.trim(),
      fileUrl: uploadedFile.url,
      courseId: courseId,
      uploadedById: req.user.id,
    },
  });

  // Notify enrolled students about new material
  const enrollments = await prisma.enrollment.findMany({
    where: {
      id: courseId,
    },
    select: {
      studentId: true,
    },
  });

  if (enrollments.length > 0) {
    const studentIds = enrollments.map((enrollment: { studentId: string }) => enrollment.studentId);

    const notifications = studentIds.map((studentId: string) => ({
      userId: studentId,
      message: `New material "${material.title}" has been uploaded for the course "${course.name}".`,
      type: 'MATERIAL_NEW',
    }));

    await prisma.notification.createMany({ data: notifications });
  }

  return res.status(201).json(new ApiResponse(201, material, 'Material uploaded successfully'));
});

const markAttendance = asyncHandler(async (req: any, res) => {
  // TODO: Validate request body
  // - Validate required fields: studentId, status (PRESENT/ABSENT/LATE)
  // - Validate courseId from params
  // TODO: Verify course and enrollment
  // - Check if course exists
  // - Verify student is enrolled in the course
  // TODO: Check for duplicate attendance
  // - Ensure attendance hasn't already been marked for this date
  // TODO: Create attendance record
  // - Create new attendance record with Prisma
  // - Include course, student, and marker (faculty) information
  // TODO: Send response
  // - Return success response with attendance record
  const userId = req.user.id;
  const { courseId } = req.params;
  const { studentId, status } = req.body;

  if (!courseId || !studentId || !status) {
    throw new ApiError(400, 'all fields are required');
  }

  if (!['PRESENT', 'ABSENT', 'LATE'].includes(status)) {
    throw new ApiError(400, 'Invalid attendance status');
  }

  const course = await prisma.course.findUnique({ where: { id: courseId } });

  if (!course) {
    throw new ApiError(400, 'course not found');
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId,
        courseId,
      },
    },
  });

  if (!enrollment) {
    throw new ApiError(400, 'student not enrolled in course');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existingAttendance = await prisma.attendance.findFirst({
    where: {
      studentId,
      courseId,
      date: {
        gte: today,
        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // end of today
      },
    },
  });

  if (existingAttendance) {
    throw new ApiError(400, 'Attendance already marked for today');
  }

  const attendance = await prisma.attendance.create({
    data: {
      status,
      studentId,
      courseId,
      markedById: userId,
    },
  });

  return res.status(200).json(new ApiResponse(200, attendance, 'success'));
});

const getAttendance = asyncHandler(async (req, res) => {
  // TODO: Validate course ID
  // - Get courseId from params
  // - Verify course exists
  // TODO: Handle query parameters
  // - Parse date range filters
  // - Parse student filters if any
  // - Parse pagination parameters
  // TODO: Verify permissions
  // - Ensure user is faculty or admin (handled by middleware)
  // - If faculty, verify they are associated with the course
  // TODO: Fetch attendance records
  // - Query database for course attendance
  // - Include student information
  // - Apply date and student filters
  // TODO: Calculate statistics
  // - Calculate attendance percentages
  // - Group by student if requested
  // TODO: Send response
  // - Return success response with attendance records
  // - Include attendance statistics
  // - Include pagination metadata
});

const enrollInCourse = asyncHandler(async (req: any, res) => {
  const { courseId } = req.params;

  // Validate course exists
  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) {
    throw new ApiError(404, 'Course does not exist');
  }

  // Get authenticated student
  const studentId = req.user.id;

  // Check existing enrollment
  const alreadyEnrolled = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId,
        courseId,
      },
    },
  });

  if (alreadyEnrolled) {
    throw new ApiError(409, 'Already enrolled in this course');
  }

  // Create enrollment
  const enroll = await prisma.enrollment.create({
    data: {
      studentId,
      courseId,
    },
  });

  // Notify the course creator (faculty)
  await prisma.notification.create({
    data: {
      userId: course.createdById,
      message: `New enrollment for the course "${course.name}".`,
      type: 'NEW_ENROLLMENT',
    },
  });

  return res.status(200).json(new ApiResponse(200, enroll, 'Enrollment successful'));
});

const getEnrollments = asyncHandler(async (req, res) => {
  // TODO: Validate course ID
  // - Get courseId from params
  // - Verify course exists
  // TODO: Handle query parameters
  // - Parse pagination parameters
  // - Parse status filters if any
  // TODO: Verify permissions
  // - Ensure user is faculty or admin (handled by middleware)
  // - If faculty, verify they created the course
  // TODO: Fetch enrollments
  // - Query database for course enrollments
  // - Include student information
  // - Include enrollment date
  // - Include attendance statistics
  // TODO: Send response
  // - Return success response with enrollments array
  // - Include course summary data
  // - Include pagination metadata
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
