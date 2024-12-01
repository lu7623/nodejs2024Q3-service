import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Art of Doubt' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 2018 })
  year: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '58423dc6-d6ff-4e5e-bf96-e30a9642390d' })
  artistId?: string;
}
