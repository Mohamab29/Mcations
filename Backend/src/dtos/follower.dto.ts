import { IsString, IsUUID } from 'class-validator';

export class AddFollowerDto {
  @IsString()
  @IsUUID(4)
  userId!: string;

  @IsString()
  @IsUUID(4)
  vacationId!: string;
}

export class RemoveFollowerDto {
  @IsString()
  @IsUUID(4)
  userId!: string;

  @IsString()
  @IsUUID(4)
  vacationId!: string;
}

export interface FollowerStats {
  vacationId: string;
  destination: string;
  followerCount: number;
}