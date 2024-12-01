import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class ArtistDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '58423dc6-d6ff-4e5e-bf96-e30a9642390d' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'David Bowie' })
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  grammy: boolean;
  constructor(name: string, grammy: boolean) {
    this.id = uuid();
    this.name = name;
    this.grammy = grammy;
  }
}
