import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
    id: string;
}

@injectable()
export default class DeleteUserService {
  constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.deleteUser(id);

    return users;
  }
}
