import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../infrastructure/logging/logger';

const router = Router();
/**
 * @swagger
 * /api/health-check:
 *   get:
 *     tags: [Health Check]
 *     summary: Checks if the app is running correctly
 *     responses:
 *       200:
 *         description: Everything is OK
 * */
router.get('/', async (req, res, next) => {
    try {
        let msg = "Health check connected";
        logger.info(msg);
        res.status(StatusCodes.OK).json(msg);
    } catch (error) {
      next(error);
    }
  });

  export const healthCheckRoute = router;