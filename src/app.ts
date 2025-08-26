import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

const app = express();

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(globalLimiter);

import adminRouter from './routes/admin.routes';
import announcementsRouter from './routes/announcements.routes';
import authRouter from './routes/auth.routes';
import coursesRouter from './routes/courses.routes';
import eventRouter from './routes/event.routes';
import notificationRouter from './routes/notification.routes';
import resultsRouter from './routes/results.routes';
import studentsRouter from './routes/students.routes';

app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/announcements', announcementsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/courses', coursesRouter);
app.use('/api/v1/event', eventRouter);
app.use('/api/v1/notification', notificationRouter);
app.use('/api/v1/results', resultsRouter);
app.use('/api/v1/students', studentsRouter);

export default app;
