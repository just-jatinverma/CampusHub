import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware';
import { getStudentAttendance, getStudentEnrollments } from '../controllers/students.controller';

const router = Router();

router.get('/:studentId/attendance', verifyJWT, getStudentAttendance);
router.get('/:studentId/enrollments', verifyJWT, getStudentEnrollments);

export default router;
