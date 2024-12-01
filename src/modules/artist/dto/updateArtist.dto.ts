import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateArtistDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Thom Yorke' })
  name?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ example: true })
  grammy?: boolean;
}
