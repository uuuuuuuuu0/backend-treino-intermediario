import { User } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUserRepository from '../repositories/IUsersRepository';

type IRequest = ICreateUserDTO;

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) { }

  public async execute({
    name, email, cpf, password,
  }: IRequest): Promise<Omit<User, 'password'>> {
    const checkIfUserWithSameEmailExists = await this.usersRepository.findByEmail(email);
    const checkIfUserWithSameCpfExists = await this.usersRepository.findByCpf(cpf);

    if (checkIfUserWithSameCpfExists) {
      throw new AppError('Cpf already used');
    }
    if (checkIfUserWithSameEmailExists) {
      throw new AppError('Email already used');
    }

    const hashedPassword = await hash(password, 8);

    const { password: _, ...userWithoutPassword } = await this.usersRepository.createUser(
      {
        name,
        email,
        cpf,
        password: hashedPassword,
      },
    );

    return userWithoutPassword;
  }
}
