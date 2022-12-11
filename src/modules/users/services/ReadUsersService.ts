import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUsersRepository';

@injectable()
export default class ReadUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) { }

  public async execute(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.readUsers();

    const usersWithoutPassword: Omit<User, 'password'>[] = [];

    users.forEach((element) => {
      const { password: _, ...userWithoutPassword } = element;
      usersWithoutPassword.push(userWithoutPassword);
    });

    return usersWithoutPassword;
  }
}
