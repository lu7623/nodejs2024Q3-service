import { IsString } from 'class-validator';

export class CredentialsDto {
  @IsString({ message: 'Must be a string' })
  login: string;

  @IsString({ message: 'Must be a string' })
  password: string;
}
