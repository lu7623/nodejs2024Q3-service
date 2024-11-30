import { UserDto } from 'src/user/dto/user.dto';

export const userWithoutPassword = (user: UserDto) => {
  const { password, ...rest } = user;
  return rest;
};
