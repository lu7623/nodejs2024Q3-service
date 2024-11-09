import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ServiceResponse, serviceResponse } from 'src/utils/types';
import { validate as uuidValidate } from 'uuid';
import { Messages } from 'src/utils/messages';
import { userWithoutPassword } from 'src/utils/userWithoutPassword';

@Injectable()
export class UserService {
  private readonly users: UserDto[] = [];

  create(user: CreateUserDto) {
    let newUser = new UserDto(user.login, user.password);
    this.users.push(newUser);
    return serviceResponse({ error: false, data: userWithoutPassword(newUser) });
  }

  getAllUsers(): UserDto[] {
    return this.users;
  }

  getUserById(id: string): ServiceResponse {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    let user = this.users.find((user) => user.id === id);
    if (!user) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    return serviceResponse({ error: false, data: user });
  }

  update(id: string, dto: UpdateUserDto) {
    let user = this.users.find((user) => user.id === id);
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
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
    let userInd = this.users.findIndex((user) => user.id === id);
    if (userInd !== -1) {
      this.users.splice(userInd, 1);
      return serviceResponse({ error: false });
    }
    return serviceResponse({ message: Messages.NotFound, error: true });
  }
}
