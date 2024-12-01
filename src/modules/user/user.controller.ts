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
import { UserResp } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Messages } from 'src/utils/messages';
import { isCreateUserDto, isUpdateUserDto } from 'src/utils/typeGuards';
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    type: UserResp,
  })
  @ApiResponse({
    status: 400,
    description: 'Provided data format is incorrect',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    if (!isCreateUserDto(createUserDto)) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    return await this.userService.create(createUserDto);
  }

  @Get()
  @Header('content-type', 'application/json')
  @ApiResponse({
    status: 200,
    type: [UserResp],
  })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  @ApiResponse({
    status: 200,
    type: UserResp,
  })
  @ApiResponse({
    status: 400,
    description: 'This id is not of UUID type',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  async getUserById(@Param('id') id: string) {
    const res = await this.userService.getUserById(id);
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
  @ApiResponse({
    status: 200,
    type: UserResp,
  })
  @ApiResponse({
    status: 400,
    description: 'This id is not of UUID type',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!isUpdateUserDto(updateUserDto)) {
      throw new HttpException(Messages.IncorrectData, HttpStatus.BAD_REQUEST);
    }
    const res = await this.userService.update(id, updateUserDto);
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
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'This id is not of UUID type',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  async remove(@Param('id') id: string) {
    const res = await this.userService.remove(id);
    if (res?.message === Messages.WrongIdType) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    if (res?.message === Messages.NotFound) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
  }
}
