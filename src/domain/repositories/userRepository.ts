import { User } from '../entities/user';

export interface UserRepository {
  createUser(user: User): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: number): Promise<User | null>;
}
