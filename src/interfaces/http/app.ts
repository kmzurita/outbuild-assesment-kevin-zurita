import express from 'express';
import { errorHandler } from '../middleware/errorHandler';
import { scheduleRoutes } from '../routes/scheduleRoutes';
import { authRoutes } from '../routes/authRoutes';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/schedules', scheduleRoutes);

app.use(errorHandler);

export default app;
