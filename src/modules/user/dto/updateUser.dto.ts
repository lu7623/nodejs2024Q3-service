import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'ololo' })
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'pupupu' })
  newPassword: string;
}
