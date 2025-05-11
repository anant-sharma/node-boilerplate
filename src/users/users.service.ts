import { Injectable } from '@nestjs/common';

export type User = {
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      username: 'admin',
      password: 'admin',
    },
    {
      username: 'guest',
      password: 'guest',
    },
  ];

  findOne(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}
