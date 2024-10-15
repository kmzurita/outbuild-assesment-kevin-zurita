import { Router } from 'express';
import logger from '../../infrastructure/logging/logger';

const router = Router();
router.get('/', async (req, res, next) => {
    try {
        let msg = "Health check connected";
        logger.info(msg);
        res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  });

  export const healthCheckRoute = router;