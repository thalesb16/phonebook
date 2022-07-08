import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ContactDTO {
  @ApiPropertyOptional({
    example: 'Object Id',
  })
  id?: string;

  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  @ApiProperty({
    description: 'Contact name',
    example: 'Stevie Ray',
  })
  name: string;

  @IsNotEmpty({ message: 'phone is required' })
  @IsString({ message: 'phone must be a string' })
  @ApiProperty({
    description: 'Contact Phonenumber',
    example: '+55519999999',
  })
  phone: string;

  @IsOptional()
  @IsString({ message: 'group must be a string' })
  @ApiPropertyOptional({
    description: 'Contact group',
    example: 'Family',
  })
  group: string;
}

export class CreateContactDTO extends OmitType(ContactDTO, ['id'] as const) {}
export class UpdateContactDTO extends OmitType(ContactDTO, [
  'id',
  'phone',
  'name',
] as const) {}
