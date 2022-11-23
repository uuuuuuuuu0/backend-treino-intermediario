import UsersRepository from '@modules/users/infra/prisma/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);
