import { Repository, DataSource } from 'typeorm';
import { User } from '../entities/User.entity';

export class UserRepository {
  private repository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findById(userId: string): Promise<User | null> {
    return this.repository.findOne({ where: { userId } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repository.findOne({ where: { username } });
  }

  async findByUsernameWithPassword(username: string): Promise<User | null> {
    return this.repository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect('user.password')
      .getOne();
  }

  async findByCredentials(username: string, password: string): Promise<User | null> {
    return this.repository.findOne({
      where: { username, password },
      select: ['userId', 'firstName', 'lastName', 'username', 'isAdmin', 'password'],
    });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }

  async update(userId: string, updates: Partial<User>): Promise<User | null> {
    await this.repository.update({ userId }, updates);
    return this.findById(userId);
  }

  async delete(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }

  async exists(userId: string): Promise<boolean> {
    const count = await this.repository.count({ where: { userId } });
    return count > 0;
  }

  async usernameExists(username: string): Promise<boolean> {
    const count = await this.repository.count({ where: { username } });
    return count > 0;
  }
}