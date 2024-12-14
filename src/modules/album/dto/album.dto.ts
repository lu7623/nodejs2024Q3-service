import { v4 as uuid } from 'uuid';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class AlbumDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '58423dc6-d6ff-4e5e-bf96-e30a9642390d' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Lungs' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 2011 })
  year: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '58423dc6-d6ff-4e5e-bf96-e30a9642390d' })
  artistId: string | null;
  constructor(name: string, year: number, artistId?: string) {
    this.id = uuid();
    this.name = name;
    this.artistId = artistId || null;
    this.year = year;
  }
}
