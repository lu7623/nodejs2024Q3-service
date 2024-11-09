import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ServiceResponse, serviceResponse } from 'src/utils/types';
import { validate as uuidValidate } from 'uuid';
import { Messages } from 'src/utils/messages';
import { userWithoutPassword } from 'src/utils/userWithoutPassword';
import { DataBase, dB } from 'src/database/db';

@Injectable()
export class UserService {
  private dB: DataBase = dB;

  create(user: CreateUserDto) {
    let newUser = new UserDto(user.login, user.password);
    this.dB.users[newUser.id] = newUser;
    return serviceResponse({
      error: false,
      data: userWithoutPassword(newUser),
    });
  }

  getAllUsers(): UserDto[] {
    return Object.values(this.dB.users);
  }

  getUserById(id: string): ServiceResponse {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let user = this.dB.users?.[id];
    if (!user) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    return serviceResponse({ error: false, data: user });
  }

  update(id: string, dto: UpdateUserDto) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let user = this.dB.users?.[id];
    if (!user) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    if (user.password !== dto.oldPassword) {
      return serviceResponse({
        error: true,
        message: Messages.WrongOldPassword,
      });
    }
    user.password = dto.newPassword;
    return serviceResponse({ error: false, data: userWithoutPassword(user) });
  }

  remove(id: string) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let user = this.dB.users?.[id];
    if (!user) {
      return serviceResponse({ message: Messages.NotFound, error: true });
    }
    delete this.dB.users[id];
    return serviceResponse({ error: false });
  }
}
