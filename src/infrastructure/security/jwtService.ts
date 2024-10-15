import jwt from 'jsonwebtoken';

export class JwtService {
  constructor(private readonly secretKey: string) {}

  generateToken(payload: object): string {
    const time = '1h';
    return jwt.sign(payload, this.secretKey, { expiresIn: time });
  }

  verifyToken(token: string): object | string {
    return jwt.verify(token, this.secretKey);
  }
}