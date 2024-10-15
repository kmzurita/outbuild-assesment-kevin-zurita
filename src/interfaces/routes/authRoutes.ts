import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../../infrastructure/database/prismaUserRepository';
import { JwtService } from '../../infrastructure/security/jwtService';
import bcrypt from 'bcrypt';
import logger from '../../infrastructure/logging/logger';

const router = Router();
const prisma = new PrismaClient();
const userRepository = new PrismaUserRepository(prisma);
const jwtService = new JwtService(process.env.JWT_SECRET!);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
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
    res.status(StatusCodes.CREATED).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({"error": "User already exists"});
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and receive a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 */
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
    res.status(StatusCodes.BAD_REQUEST).json({"error": "Invalid credentials"});
  }
});

export const authRoutes = router;
