import { User } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import IUserRepository from '../repositories/IUsersRepository';

type IRequest = Partial<IUpdateUserDTO> & {
  id: string;
};

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) { }

  public async execute({
    id, name, email, cpf, password,
  }: IRequest): Promise<Omit<User, 'password'>> {
    if (email) {
      const checkNewEmail = await this.usersRepository.findByEmail(email);
      if (checkNewEmail) {
        throw new AppError('Email already used');
      }
    }
    if (cpf) {
      const checkNewCpf = await this.usersRepository.findByCpf(cpf);
      if (checkNewCpf) {
        throw new AppError('Cpf already used');
      }
    }

    if (password) {
      const hashedPassword = await hash(password, 8);

      const { password: _, ...updatedUserWithoutPassword } = await this.usersRepository.updateUser(
        id,
        {
          name,
          email,
          cpf,
          password: hashedPassword,
        },
      );
      return updatedUserWithoutPassword;
    }

    const { password: _, ...updatedUserWithoutPassword } = await this.usersRepository.updateUser(
      id,
      {
        name,
        email,
        cpf,
      },
    );
    return updatedUserWithoutPassword;
  }
}
