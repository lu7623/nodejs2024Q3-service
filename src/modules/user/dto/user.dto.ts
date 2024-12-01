import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UserResp {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '58423dc6-d6ff-4e5e-bf96-e30a9642390d' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Anonimus' })
  login: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 121682768 })
  createdAt: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 121682768 })
  updatedAt: number;
}

export class UserDto extends UserResp {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '111111' })
  password: string;

  constructor(login: string, password: string) {
    super();
    this.login = login;
    this.password = password;
  }
}
