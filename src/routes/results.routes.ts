import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware';
import { checkRole } from '../middleware/role.middleware';
import {
  createResult,
  getStudentResults
} from '../controllers/results.controller';

const router = Router();

router.post('/', verifyJWT, checkRole(['admin']), createResult);
router.get('/:studentId', verifyJWT, getStudentResults);

export default router;