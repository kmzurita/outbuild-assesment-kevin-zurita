import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entities/user';
import { UserRepository } from '../../domain/repositories/userRepository';

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async createUser(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.getId(),
        email: user.getEmail(),
        passwordHash: user.getPasswordHash(),
      },
    });
    return new User(createdUser.id, createdUser.email, createdUser.passwordHash);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? new User(user.id, user.email, user.passwordHash) : null;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? new User(user.id, user.email, user.passwordHash) : null;
  }
}