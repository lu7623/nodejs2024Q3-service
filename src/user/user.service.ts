import { Injectable } from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { CreateUserDto } from './dto/createUser.dto'


@Injectable()
export class UserService {
  private readonly users: UserDto[] = []

  create(user: CreateUserDto) {
    let newUser = new UserDto(user.login, user.password)
    this.users.push(newUser);
    return newUser;
  }

  getAllUsers(): UserDto[] {
    return this.users
  }
}