import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from '../repositories/user.repository';
import { RegisterDto, LoginDto, AuthResponse } from '../dtos/auth.dto';
import { CryptoUtil } from '../utils/crypto.util';
import { ConflictError, UnauthorizedError } from '../types/errors';
import { User } from '../entities/User.entity';

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    // Check if username already exists
    const existingUser = await this.userRepository.findByUsername(registerDto.username);
    if (existingUser) {
      throw new ConflictError(`Username "${registerDto.username}" is already taken`);
    }

    // Hash password
    const hashedPassword = await CryptoUtil.hashPassword(registerDto.password);

    // Create user
    const userId = uuidv4();
    const user = await this.userRepository.create({
      userId,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      username: registerDto.username,
      password: hashedPassword,
      isAdmin: registerDto.isAdmin || false,
    });

    // Generate token
    const token = CryptoUtil.generateToken({
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      isAdmin: user.isAdmin,
    });

    return {
      token,
      user: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        isAdmin: user.isAdmin,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    // Find user with password
    const user = await this.userRepository.findByUsernameWithPassword(loginDto.username);
    if (!user) {
      throw new UnauthorizedError('Invalid username or password');
    }

    // Verify password
    const isPasswordValid = await CryptoUtil.comparePassword(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid username or password');
    }

    // Generate token
    const token = CryptoUtil.generateToken({
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      isAdmin: user.isAdmin,
    });

    return {
      token,
      user: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        isAdmin: user.isAdmin,
      },
    };
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.userRepository.findById(userId);
  }
}