import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware';
import { checkRole } from '../middleware/role.middleware';
import { createAnnouncement, getAnnouncements } from '../controllers/announcements.controller';

const router = Router();

router.get('/', verifyJWT, getAnnouncements);
router.post('/', verifyJWT, checkRole(['faculty', 'admin']), createAnnouncement);

export default router;
