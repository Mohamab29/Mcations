import { FollowerRepository } from '../repositories/follower.repository';
import { VacationRepository } from '../repositories/vacation.repository';
import { UserRepository } from '../repositories/user.repository';
import { Follower } from '../entities/Follower.entity';
import { Vacation } from '../entities/Vacation.entity';
import { NotFoundError, ConflictError } from '../types/errors';
import { FollowerStats } from '../dtos/follower.dto';

export class FollowerService {
  constructor(
    private followerRepository: FollowerRepository,
    private vacationRepository: VacationRepository,
    private userRepository: UserRepository
  ) {}

  async addFollower(userId: string, vacationId: string): Promise<Follower> {
    // Verify user exists
    const userExists = await this.userRepository.exists(userId);
    if (!userExists) {
      throw new NotFoundError(`User with ID "${userId}" not found`);
    }

    // Verify vacation exists
    const vacationExists = await this.vacationRepository.exists(vacationId);
    if (!vacationExists) {
      throw new NotFoundError(`Vacation with ID "${vacationId}" not found`);
    }

    // Check if already following
    const alreadyFollowing = await this.followerRepository.exists(userId, vacationId);
    if (alreadyFollowing) {
      throw new ConflictError('User is already following this vacation');
    }

    return this.followerRepository.add(userId, vacationId);
  }

  async removeFollower(userId: string, vacationId: string): Promise<void> {
    // Check if following
    const isFollowing = await this.followerRepository.exists(userId, vacationId);
    if (!isFollowing) {
      throw new NotFoundError('User is not following this vacation');
    }

    await this.followerRepository.remove(userId, vacationId);
  }

  async getUserFollowedVacations(userId: string): Promise<Vacation[]> {
    // Verify user exists
    const userExists = await this.userRepository.exists(userId);
    if (!userExists) {
      throw new NotFoundError(`User with ID "${userId}" not found`);
    }

    return this.followerRepository.getFollowedVacations(userId);
  }

  async getVacationFollowers(vacationId: string): Promise<Follower[]> {
    // Verify vacation exists
    const vacationExists = await this.vacationRepository.exists(vacationId);
    if (!vacationExists) {
      throw new NotFoundError(`Vacation with ID "${vacationId}" not found`);
    }

    return this.followerRepository.findByVacationId(vacationId);
  }

  async getFollowerCount(vacationId: string): Promise<number> {
    return this.followerRepository.countByVacationId(vacationId);
  }

  async isUserFollowing(userId: string, vacationId: string): Promise<boolean> {
    return this.followerRepository.exists(userId, vacationId);
  }

  async getFollowerStats(): Promise<FollowerStats[]> {
    const stats = await this.vacationRepository.getFollowerCount();
    return stats.map((stat) => ({
      vacationId: stat.vacationId,
      destination: stat.destination,
      followerCount: stat.followerNumber,
    }));
  }
}