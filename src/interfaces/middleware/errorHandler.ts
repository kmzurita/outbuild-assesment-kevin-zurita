import { Request, Response, NextFunction } from 'express';
import logger from '../../infrastructure/logging/logger';

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ message: 'Internal server error' });
};
