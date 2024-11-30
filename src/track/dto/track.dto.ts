import { v4 as uuid } from 'uuid';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class TrackDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '58423dc6-d6ff-4e5e-bf96-e30a9642390d' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Rabbit Heart' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '58423dc6-d6ff-4e5e-bf96-e30a9642390d' })
  artistId: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '58423dc6-d6ff-4e5e-bf96-e30a9642390d' })
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 344 })
  duration: number;

  constructor(
    name: string,
    duration: number,
    artistId?: string,
    albumId?: string,
  ) {
    this.id = uuid();
    this.name = name;
    this.artistId = artistId || null;
    this.albumId = albumId || null;
    this.duration = duration;
  }
}
