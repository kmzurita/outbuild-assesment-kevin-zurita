import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtService } from '../../infrastructure/security/jwtService';

export const authMiddleware = (jwtService: JwtService) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No token provided' });
    }

    const token = (authHeader as string).split(' ')[1];
    try {
      const decoded = jwtService.verifyToken(token) as { userId: string };
      req.body.userId = decoded.userId;
      next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
    }
  };
};
