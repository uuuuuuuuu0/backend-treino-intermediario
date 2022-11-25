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

  public async createUser({
    email, name, cpf, password,
  }: ICreateUserDTO): Promise<User> {
    const createdUser = await this.prismaClient.create({
      data: {
        email, name, cpf, password,
      },
    });

    return createdUser;
  }

  public async readUsers(): Promise<User[]> {
    const allUsers = await this.prismaClient.findMany();

    return allUsers;
  }

  public async findById(id: string): Promise<User | null> {
    const foundUser = await this.prismaClient.findUnique({ where: { id } });

    return foundUser;
  }

  public async findByCpf(cpf: number): Promise<User | null> {
    const foundUser = await this.prismaClient.findUnique({ where: { cpf } });

    return foundUser;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const foundUser = await this.prismaClient.findUnique({ where: { email } });

    return foundUser;
  }

  public async updateUser(id: string, {
    email, name, cpf, password,
  }: IUpdateUserDTO): Promise<User> {
    const updatedUser = await this.prismaClient.update({
      where: {
        id,
      },
      data: {
        email: email || undefined,
        name: name || undefined,
        cpf: cpf || undefined,
        password: password || undefined,
      },
    });
    return updatedUser;
  }

  public async deleteUser(id: string): Promise<User[]> {
    this.prismaClient.delete({ where: { id } });
    const allUsers = await this.prismaClient.findMany();
    return allUsers;
  }
}
