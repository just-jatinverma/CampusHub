import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware';
import { checkRole } from '../middleware/role.middleware';
import { getAllUsers, updateUserRole } from '../controllers/admin.controller';

const router = Router();

router.use(verifyJWT, checkRole(['admin']));

router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);

export default router;
