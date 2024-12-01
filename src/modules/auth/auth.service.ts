import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/Credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(dto: CredentialsDto): Promise<{ access_token: string }> {
    const user = await this.usersService.getUserByLogin(dto.login);
    if (user?.password !== dto.password) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id, login: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(body: CredentialsDto) {
    const { login } = body;
    const existedUser = await this.usersService.getUserByLogin(login);
    if (existedUser) {
      throw new BadRequestException('User with this login already exists');
    }
    const newUser = await this.usersService.create(body);
    const token = await this.jwtService.signAsync({
      userId: newUser.id,
      login: newUser.login,
    });
    return {
      access_token: token,
    };
  }
}
