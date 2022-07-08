import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDTO {
  @ApiPropertyOptional({
    example: 'Object Id',
  })
  id?: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsString({ message: 'email must be a string' })
  @ApiProperty({
    description: 'User email',
    example: 'stevie_ray@mail.com',
  })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @ApiProperty({
    description: 'User password',
  })
  password: string;
  password_hash: string;

  @IsOptional()
  @IsString({ message: 'name must be a string' })
  @ApiPropertyOptional({
    description: 'User name',
    example: 'Stevie Ray',
  })
  name: string;
}

export class CreateUserDTO extends OmitType(UserDTO, ['id'] as const) {}
export class UpdateUserDTO extends OmitType(UserDTO, [
  'id',
  'email',
] as const) {}
