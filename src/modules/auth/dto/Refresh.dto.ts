import { IsOptional, IsString } from 'class-validator';

export class RefreshDto {
  @IsOptional()
  @IsString({ message: 'must be a string' })
  refreshToken: string;
}
