import { UserDto } from 'src/modules/user/dto/user.dto';

export const userWithoutPassword = (user: UserDto) => {
  const { password, ...rest } = user;
  return rest;
};
