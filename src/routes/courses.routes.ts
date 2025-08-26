import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware';
import { checkRole } from '../middleware/role.middleware';
import {
  getCourses,
  createCourse,
  getCourseMaterials,
  uploadCourseMaterial,
  markAttendance,
  getAttendance,
  enrollInCourse,
  getEnrollments
} from '../controllers/courses.controller';

const router = Router();

router.get('/', verifyJWT, getCourses);
router.post('/', verifyJWT, checkRole(['admin']), createCourse);
router.get('/:courseId/materials', verifyJWT, getCourseMaterials);
router.post('/:courseId/materials', verifyJWT, checkRole(['faculty']), uploadCourseMaterial);
router.post('/:courseId/attendance', verifyJWT, checkRole(['faculty']), markAttendance);
router.get('/:courseId/attendance', verifyJWT, checkRole(['faculty', 'admin']), getAttendance);
router.post('/:courseId/enroll', verifyJWT, checkRole(['student']), enrollInCourse);
router.get('/:courseId/enrollments', verifyJWT, checkRole(['faculty', 'admin']), getEnrollments);

export default router;