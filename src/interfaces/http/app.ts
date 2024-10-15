import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from '../middleware/errorHandler';
import { scheduleRoutes } from '../routes/scheduleRoutes';
import { authRoutes } from '../routes/authRoutes';
import {healthCheckRoute} from '../routes/healthCheck';
import swaggerSpec from './swagger';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/health-check', healthCheckRoute)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;
