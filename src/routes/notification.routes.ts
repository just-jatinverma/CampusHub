import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware';
import {
  getUserNotifications,
  markNotificationAsRead
} from '../controllers/notification.controller';

const router = Router();

router.use(verifyJWT);

router.get('/', getUserNotifications);
router.patch('/:id/read', markNotificationAsRead);

export default router;