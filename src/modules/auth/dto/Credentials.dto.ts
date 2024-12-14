import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CredentialsDto {
  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'User' })
  login: string;

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'Password' })
  password: string;
}
