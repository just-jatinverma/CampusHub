import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware';
import { checkRole } from '../middleware/role.middleware';
import {
  createEvent,
  getEvents
} from '../controllers/event.controller';

const router = Router();

router.get('/', verifyJWT, getEvents);
router.post('/', verifyJWT, checkRole(['faculty', 'admin']), createEvent);

export default router;