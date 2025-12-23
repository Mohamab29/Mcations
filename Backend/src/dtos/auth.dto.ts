import { IsString, MinLength, MaxLength, Matches, IsOptional, IsBoolean } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/^[a-zA-Z]{2,30}$/, {
    message: 'First name must contain only letters and be 2-30 characters long',
  })
  firstName!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(40)
  @Matches(/^[a-zA-Z]{2,40}$/, {
    message: 'Last name must contain only letters and be 2-40 characters long',
  })
  lastName!: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @Matches(/^[0-9a-zA-Z]{4,30}$/, {
    message: 'Username must contain only letters and numbers and be 4-30 characters long',
  })
  username!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
  })
  password!: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}

export class LoginDto {
  @IsString()
  @MinLength(1)
  username!: string;

  @IsString()
  @MinLength(1)
  password!: string;
}

export interface AuthResponse {
  token: string;
  user: {
    userId: string;
    firstName: string;
    lastName: string;
    username: string;
    isAdmin: boolean;
  };
}