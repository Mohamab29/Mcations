import { v4 as uuidv4 } from 'uuid';
import { VacationRepository } from '../repositories/vacation.repository';
import {
  CreateVacationDto,
  UpdateVacationDto,
  VacationFilters,
  VacationSortOptions,
} from '../dtos/vacation.dto';
import { PaginatedResponse } from '../types/responses';
import { NotFoundError, BadRequestError } from '../types/errors';
import { Vacation } from '../entities/Vacation.entity';

export class VacationService {
  constructor(private vacationRepository: VacationRepository) {}

  async getAllVacations(
    page: number = 1,
    limit: number = 10,
    filters?: VacationFilters,
    sort?: VacationSortOptions
  ): Promise<PaginatedResponse<Vacation>> {
    // Validate pagination parameters
    if (page < 1) page = 1;
    if (limit < 1 || limit > 100) limit = 10;

    const [vacations, total] = await this.vacationRepository.findAllPaginated(
      page,
      limit,
      filters,
      sort
    );

    return {
      success: true,
      data: vacations,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getVacationById(vacationId: string): Promise<Vacation> {
    const vacation = await this.vacationRepository.findById(vacationId);
    if (!vacation) {
      throw new NotFoundError(`Vacation with ID "${vacationId}" not found`);
    }
    return vacation;
  }

  async createVacation(createDto: CreateVacationDto): Promise<Vacation> {
    // Validate dates
    const startDate = new Date(createDto.startDate);
    const endDate = new Date(createDto.endDate);
    const now = new Date();

    if (startDate < now) {
      throw new BadRequestError('Start date must be in the future');
    }

    if (endDate <= startDate) {
      throw new BadRequestError('End date must be after start date');
    }

    const vacationId = uuidv4();
    return this.vacationRepository.create({
      vacationId,
      description: createDto.description,
      destination: createDto.destination,
      price: createDto.price,
      startDate,
      endDate,
      imageName: createDto.imageName || null,
    });
  }

  async updateVacation(vacationId: string, updateDto: UpdateVacationDto): Promise<Vacation> {
    // Check if vacation exists
    await this.getVacationById(vacationId);

    // Validate dates if provided
    if (updateDto.startDate || updateDto.endDate) {
      const vacation = await this.vacationRepository.findById(vacationId);
      const startDate = updateDto.startDate ? new Date(updateDto.startDate) : vacation!.startDate;
      const endDate = updateDto.endDate ? new Date(updateDto.endDate) : vacation!.endDate;

      if (endDate <= startDate) {
        throw new BadRequestError('End date must be after start date');
      }
    }

    // Prepare update object
    const updates: Partial<Vacation> = {};
    if (updateDto.description !== undefined) updates.description = updateDto.description;
    if (updateDto.destination !== undefined) updates.destination = updateDto.destination;
    if (updateDto.price !== undefined) updates.price = updateDto.price;
    if (updateDto.startDate !== undefined) updates.startDate = new Date(updateDto.startDate);
    if (updateDto.endDate !== undefined) updates.endDate = new Date(updateDto.endDate);
    if (updateDto.imageName !== undefined) updates.imageName = updateDto.imageName;

    const updated = await this.vacationRepository.update(vacationId, updates);
    if (!updated) {
      throw new NotFoundError(`Vacation with ID "${vacationId}" not found`);
    }
    return updated;
  }

  async deleteVacation(vacationId: string): Promise<void> {
    // Check if vacation exists
    await this.getVacationById(vacationId);
    await this.vacationRepository.delete(vacationId);
  }

  async getFollowerStats(): Promise<Array<{ vacationId: string; destination: string; followerNumber: number }>> {
    return this.vacationRepository.getFollowerCount();
  }
}