import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 12;

export class CryptoUtil {
  static async hashPassword(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, SALT_ROUNDS);
  }

  static async comparePassword(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }

  static generateToken(user: {
    userId: string;
    firstName: string;
    lastName: string;
    username: string;
    isAdmin: boolean;
  }): string {
    const payload = { user };
    const secret = process.env.JWT_KEY;
    if (!secret) {
      throw new Error('JWT_KEY environment variable is not defined');
    }
    return jwt.sign(payload, secret, { expiresIn: '2h' });
  }

  static verifyToken(token: string): any {
    const secret = process.env.JWT_KEY;
    if (!secret) {
      throw new Error('JWT_KEY environment variable is not defined');
    }
    return jwt.verify(token, secret);
  }
}