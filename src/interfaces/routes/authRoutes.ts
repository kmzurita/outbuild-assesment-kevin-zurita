import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../../infrastructure/database/prismaUserRepository';
import { JwtService } from '../../infrastructure/security/jwtService';
import bcrypt from 'bcrypt';
import logger from '../../infrastructure/logging/logger';

const router = Router();
const prisma = new PrismaClient();
const userRepository = new PrismaUserRepository(prisma);
const jwtService = new JwtService(process.env.JWT_SECRET!);

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
        throw Error;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser({
        email,
        passwordHash,
        id: 0,
    });
    logger.info(`User registered: ${user.id}`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({"error": "User already exists"});
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw Error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        throw Error;
    }
    const token = jwtService.generateToken({ userId: user.id });
    logger.info(`User logged in: ${user.id}`);
    res.json({ token });
  } catch (error) {
    res.status(400).json({"error": "Invalid credentials"});
  }
});

export const authRoutes = router;
