import { User } from '@prisma/client';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IUserRepository {
  // eslint-disable-next-line object-curly-newline
  createUser({ id, name, cpf, email }: ICreateUserDTO): Promise<User>;

  getUsers(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByCpf(cpf: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  removeUser(id: string): Promise<User[]>;
}

export default IUserRepository;
