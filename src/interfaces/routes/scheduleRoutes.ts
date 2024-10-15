import { Router } from 'express';
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

router.post('/', async (req, res, next) => {
  try {
    const createScheduleUseCase = new CreateScheduleUseCase(scheduleRepository);
    const schedule = await createScheduleUseCase.execute({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      userId: req.body.userId!,
    });
    logger.info(`Schedule created: ${schedule.getId()}`);
    res.status(201).json(schedule);
  } catch (error) {
    next(error);
  }
});

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
    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

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
    res.status(201).json({ message: 'Activities added successfully' });
  } catch (error) {
    next(error);
  }
});

export const scheduleRoutes = router;
