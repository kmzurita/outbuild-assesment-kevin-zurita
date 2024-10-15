import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';
import { PrismaScheduleRepository } from '../../infrastructure/database/prismaScheduleRepository';
import { PrismaActivityRepository } from '../../infrastructure/database/prismaActivityRepository';
import { CreateScheduleUseCase } from '../../application/useCases/createSchedule';
import { GetScheduleWithActivitiesUseCase } from '../../application/useCases/getScheduleWithActivities';
import { AddActivityToScheduleUseCase } from '../../application/useCases/addActivityToSchedule';
import { AddActivityBatchToScheduleUseCase } from '../../application/useCases/addActivityBatchToSchedule'; 
import { authMiddleware } from '../middleware/authMiddleware';
import { JwtService } from '../../infrastructure/security/jwtService';
import logger from '../../infrastructure/logging/logger';

const router = Router();
const prisma = new PrismaClient();
const scheduleRepository = new PrismaScheduleRepository(prisma);
const activityRepository = new PrismaActivityRepository(prisma);
const jwtService = new JwtService(process.env.JWT_SECRET!);

router.use(authMiddleware(jwtService));

/**
 * @swagger
 * /api/schedules:
 *   post:
 *     summary: Create a new schedule
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - imageUrl
 *             properties:
 *               name:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', async (req, res, next) => {
  try {
    const createScheduleUseCase = new CreateScheduleUseCase(scheduleRepository);
    const schedule = await createScheduleUseCase.execute({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      userId: req.body.userId!,
    });
    logger.info(`Schedule created: ${schedule.getId()}`);
    res.status(StatusCodes.CREATED).json(schedule);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/schedules/{id}:
 *   get:
 *     summary: Get a schedule with its activities
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: int
 *     responses:
 *       200:
 *         description: Schedule with activities
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Schedule not found
 */
router.get('/:id', async (req, res, next) => {
  try {
    const getScheduleWithActivitiesUseCase = new GetScheduleWithActivitiesUseCase(
      scheduleRepository,
      activityRepository
    );
    const result = await getScheduleWithActivitiesUseCase.execute(Number(req.params.id));
    logger.info(`Schedule retrieved: ${req.params.id}`);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/schedules/{id}/activities:
 *   post:
 *     summary: Add an activity to a schedule
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: int
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - startDate
 *               - endDate
 *             properties:
 *               name:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Activity added successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Schedule not found
 */
router.post('/:id/activities', async (req, res, next) => {
  try {
    const addActivityToScheduleUseCase = new AddActivityToScheduleUseCase(activityRepository);
    const activity = await addActivityToScheduleUseCase.execute({
      name: req.body.name,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      scheduleId: Number(req.params.id),
    });
    logger.info(`Activity added to schedule: ${activity.getId()}`);
    res.status(StatusCodes.CREATED).json(activity);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/schedules/{id}/activities/batch:
 *   post:
 *     summary: Add multiple activities to a schedule
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - activities
 *             properties:
 *               activities:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - startDate
 *                     - endDate
 *                   properties:
 *                     name:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *     responses:
 *       201:
 *         description: Activities added successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Schedule not found
 */
router.post('/:id/activities/batch', async (req, res, next) => {
  try {
    const addMultipleActivitiesToScheduleUseCase = new AddActivityBatchToScheduleUseCase(
      activityRepository
    );
    await addMultipleActivitiesToScheduleUseCase.execute(
      req.body.activities.map((activity: any) => ({
        name: activity.name,
        startDate: new Date(activity.startDate),
        endDate: new Date(activity.endDate),
        scheduleId: req.params.id,
      }))
    );
    logger.info(`Multiple activities added to schedule: ${req.params.id}`);
    res.status(StatusCodes.CREATED).json({ message: 'Activities added successfully' });
  } catch (error) {
    next(error);
  }
});

export const scheduleRoutes = router;
