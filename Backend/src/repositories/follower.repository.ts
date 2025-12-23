import { Repository, DataSource } from 'typeorm';
import { Follower } from '../entities/Follower.entity';
import { Vacation } from '../entities/Vacation.entity';

export class FollowerRepository {
  private repository: Repository<Follower>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Follower);
  }

  async findAll(): Promise<Follower[]> {
    return this.repository.find();
  }

  async findByUserId(userId: string): Promise<Follower[]> {
    return this.repository.find({
      where: { userId },
      relations: ['vacation'],
    });
  }

  async findByVacationId(vacationId: string): Promise<Follower[]> {
    return this.repository.find({
      where: { vacationId },
      relations: ['user'],
    });
  }

  async findOne(userId: string, vacationId: string): Promise<Follower | null> {
    return this.repository.findOne({
      where: { userId, vacationId },
    });
  }

  async getFollowedVacations(userId: string): Promise<Vacation[]> {
    const followers = await this.repository.find({
      where: { userId },
      relations: ['vacation'],
    });

    return followers.map((follower) => follower.vacation);
  }

  async add(userId: string, vacationId: string): Promise<Follower> {
    // Check if already following
    const existing = await this.findOne(userId, vacationId);
    if (existing) {
      return existing;
    }

    const follower = this.repository.create({ userId, vacationId });
    return this.repository.save(follower);
  }

  async remove(userId: string, vacationId: string): Promise<void> {
    await this.repository.delete({ userId, vacationId });
  }

  async exists(userId: string, vacationId: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { userId, vacationId },
    });
    return count > 0;
  }

  async countByVacationId(vacationId: string): Promise<number> {
    return this.repository.count({ where: { vacationId } });
  }

  async countByUserId(userId: string): Promise<number> {
    return this.repository.count({ where: { userId } });
  }

  async removeAllByUserId(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }

  async removeAllByVacationId(vacationId: string): Promise<void> {
    await this.repository.delete({ vacationId });
  }
}