import jwt from 'jsonwebtoken';

export class JwtService {
  constructor(private readonly secretKey: string) {}

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }

  verifyToken(token: string): object | string {
    return jwt.verify(token, this.secretKey);
  }
}