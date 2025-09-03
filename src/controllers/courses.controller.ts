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

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { Material: { select: { title: true, fileUrl: true } } },
  });

  if (!course) {
    throw new ApiError(400, 'course not found');
  }

  return res.status(200).json(new ApiResponse(200, course.Material, 'success'));
});

const uploadCourseMaterial = asyncHandler(async (req: any, res) => {
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
      courseId,
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
  const { courseId } = req.params;

  const course = await prisma.course.findUnique({ where: { id: courseId } });

  if (!course) {
    throw new ApiError(400, 'course not found');
  }

  const attendance = await prisma.attendance.findMany({
    where: { courseId },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      markedBy: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return res.status(200).json(new ApiResponse(200, attendance, 'success'));
});

const enrollInCourse = asyncHandler(async (req: any, res) => {
  const { courseId } = req.params;

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) {
    throw new ApiError(404, 'Course does not exist');
  }

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

  const enroll = await prisma.enrollment.create({
    data: {
      studentId,
      courseId,
    },
  });

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
  const { courseId } = req.params;

  const course = await prisma.course.findUnique({ where: { id: courseId } });

  if (!course) {
    throw new ApiError(400, 'course not found');
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { courseId },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return res.status(200).json(new ApiResponse(200, enrollments, 'Enrollment successful'));
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
