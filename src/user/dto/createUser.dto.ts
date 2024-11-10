import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'SuperBigDickGun' })
  login: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'ololo' })
  password: string;
}
