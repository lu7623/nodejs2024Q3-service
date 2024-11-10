import { v4 as uuid } from 'uuid';

export class UserDto {
    id: string
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number;
    constructor(login:string, password: string) {
        this.login = login;
        this.password = password;
        this.id = uuid();
        this.version = 1;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
      }
  }
  