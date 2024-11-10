import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Mr. Fear' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '58423dc6-d6ff-4e5e-bf96-e30a9642390d' })
  artistId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '58423dc6-d6ff-4e5e-bf96-e30a9642390d' })
  albumId?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 315 })
  duration?: number;
}
