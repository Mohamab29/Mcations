import {
  IsString,
  IsNumber,
  IsDateString,
  MinLength,
  MaxLength,
  Min,
  Max,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class CreateVacationDto {
  @IsString()
  @MinLength(1)
  @MaxLength(1500)
  description!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(60)
  destination!: string;

  @IsNumber()
  @Min(0)
  @Max(10000)
  price!: number;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsOptional()
  @IsString()
  @MaxLength(41)
  imageName?: string | null;
}

export class UpdateVacationDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1500)
  description?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(60)
  destination?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10000)
  price?: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(41)
  imageName?: string | null;
}

export interface VacationFilters {
  minPrice?: number;
  maxPrice?: number;
  startDateAfter?: string;
  endDateBefore?: string;
  destination?: string;
}

export interface VacationSortOptions {
  field: 'price' | 'startDate' | 'destination';
  order: 'ASC' | 'DESC';
}