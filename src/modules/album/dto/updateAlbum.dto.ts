import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Art of Doubt' })
  name?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 2018 })
  year?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '58423dc6-d6ff-4e5e-bf96-e30a9642390d' })
  artistId?: string;
}
