import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { serviceResponse } from 'src/utils/types';
import { validate as uuidValidate } from 'uuid';
import { Messages } from 'src/utils/messages';
import { userWithoutPassword } from 'src/utils/userWithoutPassword';
import { PrismaService } from 'src/prisma/prisma.service';
import { generatePasswordHash, validatePassword } from 'src/utils/passwordHash';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    const hashPassord = await generatePasswordHash(user.password);
    const data = { ...user, password: hashPassord };
    const newUser = await this.prisma.user.create({ data: data });
    return userWithoutPassword({
      ...newUser,
      createdAt: newUser.createdAt.getTime(),
      updatedAt: newUser.updatedAt.getTime(),
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
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUserByLogin(login: string) {
    const user = await this.prisma.user.findFirst({ where: { login: login } });
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    if (!uuidValidate(id)) {
      throw new HttpException(Messages.WrongIdType, HttpStatus.BAD_REQUEST);
    }
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new HttpException(Messages.NotFound, HttpStatus.NOT_FOUND);
    }
    const isValidPassword = await validatePassword(
      dto.oldPassword,
      user.password,
    );
    if (!isValidPassword) {
      throw new HttpException(Messages.WrongOldPassword, HttpStatus.FORBIDDEN);
    }
    const res = await this.prisma.user.update({
      where: { id },
      data: { password: dto.newPassword, version: user.version + 1 },
    });
    return userWithoutPassword({
      ...res,
      createdAt: res.createdAt.getTime(),
      updatedAt: res.updatedAt.getTime(),
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
