import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { serviceResponse } from 'src/utils/types';
import { validate as uuidValidate } from 'uuid';
import { Messages } from 'src/utils/messages';
import { userWithoutPassword } from 'src/utils/userWithoutPassword';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    const newUser = await this.prisma.user.create({ data: user });
    return serviceResponse({
      error: false,
      data: userWithoutPassword({
        ...newUser,
        createdAt: newUser.createdAt.getTime(),
        updatedAt: newUser.updatedAt.getTime(),
      }),
    });
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    const data = users.map((user) =>
      userWithoutPassword({
        ...user,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
      }),
    );
    return data;
  }

  async getUserById(id: string) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    return serviceResponse({ error: false, data: user });
  }

  async update(id: string, dto: UpdateUserDto) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      return serviceResponse({ error: true, message: Messages.NotFound });
    }
    if (user.password !== dto.oldPassword) {
      return serviceResponse({
        error: true,
        message: Messages.WrongOldPassword,
      });
    }
    await this.prisma.user.update({
      where: { id: id },
      data: { password: dto.newPassword },
    });
    return serviceResponse({
      error: false,
      data: userWithoutPassword({
        ...user,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
      }),
    });
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      return serviceResponse({ error: true, message: Messages.WrongIdType });
    }
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      return serviceResponse({ message: Messages.NotFound, error: true });
    }
    await this.prisma.user.delete({ where: { id: id } });
    return serviceResponse({ error: false });
  }
}
