import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/Credentials.dto';
import { RefreshDto } from './dto/Refresh.dto';
import { accessTokenConfig, refreshTokenConfig } from 'src/token/tokenConfig';
import { Messages } from 'src/utils/messages';
import { TokenPayload } from 'src/token/tokenPayload';
import { validatePassword } from 'src/utils/passwordHash';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(dto: CredentialsDto) {
    const user = await this.usersService.getUserByLogin(dto.login);

    const isValidPassword = await validatePassword(dto.password, user.password);
    if (!isValidPassword) {
      throw new HttpException(Messages.WrongOldPassword, HttpStatus.FORBIDDEN);
    }
    const payload = { id: user.id, login: user.login };
    return {
      ...payload,
      accessToken: await this.jwtService.signAsync(payload, accessTokenConfig),
      refreshToken: await this.jwtService.signAsync(
        payload,
        refreshTokenConfig,
      ),
    };
  }

  async signUp(body: CredentialsDto) {
    const { login } = body;
    const existedUser = await this.usersService.getUserByLogin(login);
    if (existedUser) {
      throw new BadRequestException('User with this login already exists');
    }
    const newUser = await this.usersService.create(body);
    const payload = {
      id: newUser.id,
      login: newUser.login,
    };
    return {
      ...payload,
      accessToken: await this.jwtService.signAsync(payload, accessTokenConfig),
      refreshToken: await this.jwtService.signAsync(
        payload,
        refreshTokenConfig,
      ),
    };
  }

  async refresh(refreshToken: RefreshDto) {
    if (!refreshToken.refreshToken) {
      throw new UnauthorizedException('Old refresh token should be provided');
    }
    try {
      const { id } = await this.jwtService.verifyAsync(
        refreshToken.refreshToken,
        refreshTokenConfig,
      );

      const user = await this.usersService.getUserById(id);
      const updatedPayload: TokenPayload = {
        userId: user.id,
        login: user.login,
      };
      return {
        accessToken: await this.jwtService.signAsync(
          updatedPayload,
          accessTokenConfig,
        ),
        refreshToken: await this.jwtService.signAsync(
          updatedPayload,
          refreshTokenConfig,
        ),
      };
    } catch {
      throw new ForbiddenException(Messages.InvalidRefreshToken);
    }
  }
}
