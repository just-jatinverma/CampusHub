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
  getEnrollments,
} from '../controllers/courses.controller';
import { upload } from '../middleware/multer.middleware';

const router = Router();

router.use(verifyJWT);

router.get('/', getCourses);
router.post('/', checkRole(['admin']), createCourse);
router.get('/:courseId/materials', getCourseMaterials);
router.post(
  '/:courseId/materials',
  upload.single('courseMaterial'),
  checkRole(['faculty']),
  uploadCourseMaterial
);
router.post('/:courseId/attendance', checkRole(['faculty']), markAttendance);
router.get('/:courseId/attendance', checkRole(['faculty', 'admin']), getAttendance);
router.post('/:courseId/enroll', checkRole(['student']), enrollInCourse);
router.get('/:courseId/enrollments', checkRole(['faculty', 'admin']), getEnrollments);

export default router;
