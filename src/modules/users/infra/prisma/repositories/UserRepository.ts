import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { User } from '@prisma/client';
import client from '@shared/infra/prisma/client';

export default class UsersRepository implements IUserRepository {
  private prismaClient;

  constructor() {
    this.prismaClient = client.user;
  }

  createUser({
    email, name, cpf, password,
  }: ICreateUserDTO): Promise<User> {
    const createdUser = this.prismaClient.create({
      data: {
        email, name, cpf, password,
      },
    });

    return createdUser;
  }

  readUsers(): Promise<User[]> {
    const allUsers = this.prismaClient.findMany();

    return allUsers;
  }

  findById(id: string): Promise<User | null> {
    const foundUser = this.prismaClient.findUnique({ where: { id } });

    return foundUser;
  }

  findByCpf(cpf: number): Promise<User | null> {
    const foundUser = this.prismaClient.findUnique({ where: { cpf } });

    return foundUser;
  }

  findByEmail(email: string): Promise<User | null> {
    const foundUser = this.prismaClient.findUnique({ where: { email } });

    return foundUser;
  }

  updateUser(id: string, {
    email, name, cpf, password,
  }: IUpdateUserDTO): Promise<User> {
    const updatedUser = this.prismaClient.update({
      where: {
        id,
      },
      data: {
        email, name, cpf, password,
      },
    });
    return updatedUser;
  }

  deleteUser(id: string): Promise<User[]> {
    this.prismaClient.delete({ where: { id } });
    const allUsers = this.prismaClient.findMany();
    return allUsers;
  }
}
