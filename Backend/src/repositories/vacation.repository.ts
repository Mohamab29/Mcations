import { Repository, DataSource, FindManyOptions } from 'typeorm';
import { Vacation } from '../entities/Vacation.entity';
import { VacationFilters, VacationSortOptions } from '../dtos/vacation.dto';

export class VacationRepository {
  private repository: Repository<Vacation>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Vacation);
  }

  async findAll(options?: FindManyOptions<Vacation>): Promise<Vacation[]> {
    return this.repository.find(options);
  }

  async findAllPaginated(
    page: number,
    limit: number,
    filters?: VacationFilters,
    sort?: VacationSortOptions
  ): Promise<[Vacation[], number]> {
    const queryBuilder = this.repository.createQueryBuilder('vacation');

    // Apply filters
    if (filters) {
      if (filters.minPrice !== undefined) {
        queryBuilder.andWhere('vacation.price >= :minPrice', { minPrice: filters.minPrice });
      }
      if (filters.maxPrice !== undefined) {
        queryBuilder.andWhere('vacation.price <= :maxPrice', { maxPrice: filters.maxPrice });
      }
      if (filters.startDateAfter) {
        queryBuilder.andWhere('vacation.startDate >= :startDateAfter', {
          startDateAfter: filters.startDateAfter,
        });
      }
      if (filters.endDateBefore) {
        queryBuilder.andWhere('vacation.endDate <= :endDateBefore', {
          endDateBefore: filters.endDateBefore,
        });
      }
      if (filters.destination) {
        queryBuilder.andWhere('vacation.destination LIKE :destination', {
          destination: `%${filters.destination}%`,
        });
      }
    }

    // Apply sorting
    if (sort) {
      queryBuilder.orderBy(`vacation.${sort.field}`, sort.order);
    } else {
      queryBuilder.orderBy('vacation.startDate', 'ASC');
    }

    // Apply pagination
    queryBuilder.skip((page - 1) * limit).take(limit);

    return queryBuilder.getManyAndCount();
  }

  async findById(vacationId: string): Promise<Vacation | null> {
    return this.repository.findOne({ where: { vacationId } });
  }

  async findByIdWithFollowers(vacationId: string): Promise<Vacation | null> {
    return this.repository.findOne({
      where: { vacationId },
      relations: ['followers'],
    });
  }

  async create(vacation: Partial<Vacation>): Promise<Vacation> {
    const newVacation = this.repository.create(vacation);
    return this.repository.save(newVacation);
  }

  async update(vacationId: string, updates: Partial<Vacation>): Promise<Vacation | null> {
    await this.repository.update({ vacationId }, updates);
    return this.findById(vacationId);
  }

  async delete(vacationId: string): Promise<void> {
    await this.repository.delete({ vacationId });
  }

  async exists(vacationId: string): Promise<boolean> {
    const count = await this.repository.count({ where: { vacationId } });
    return count > 0;
  }

  async getFollowerCount(): Promise<
    Array<{ vacationId: string; destination: string; followerNumber: number }>
  > {
    const results = await this.repository
      .createQueryBuilder('v')
      .leftJoin('v.followers', 'f')
      .select('v.vacationId', 'vacationId')
      .addSelect('v.destination', 'destination')
      .addSelect('COUNT(f.vacationId)', 'followerNumber')
      .groupBy('v.vacationId')
      .addGroupBy('v.destination')
      .getRawMany();

    return results.map((result) => ({
      vacationId: result.vacationId,
      destination: result.destination,
      followerNumber: parseInt(result.followerNumber, 10) || 0,
    }));
  }
}