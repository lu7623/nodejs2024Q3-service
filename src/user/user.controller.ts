import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  Header,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Messages } from 'src/utils/messages';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    const res = this.userService.create(createUserDto);
    return res.data;
  }

  @Get()
  @Header('content-type', 'application/json')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  getPostById(@Param('id') id: string) {
    const res = this.userService.getUserById(id);
    if (res?.message === Messages.WrongIdType) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    if (res?.message === Messages.NotFound) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
    return res.data;
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!updateUserDto.newPassword || !updateUserDto.oldPassword) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    const res = this.userService.update(id, updateUserDto);
    if (res?.message === Messages.WrongOldPassword) {
      throw new HttpException(Messages.WrongOldPassword, HttpStatus.FORBIDDEN);
    }
    if (res?.message === Messages.WrongIdType) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    if (res?.message === Messages.NotFound) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
    return res.data;
  }

  @Delete(':id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    const res = this.userService.remove(id);
    if (res?.message === Messages.WrongIdType) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    if (res?.message === Messages.NotFound) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
  }
}
