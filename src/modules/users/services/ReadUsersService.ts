import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUsersRepository';

@injectable()
export default class ReadUsersService {
  constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
  ) { }

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.readUsers();

    return users;
  }
}
