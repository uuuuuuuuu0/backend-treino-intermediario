import { User } from '@prisma/client';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

interface IUserRepository {
  // eslint-disable-next-line object-curly-newline
  createUser(data: ICreateUserDTO): Promise<User>;
  readUsers(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByCpf(cpf: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  updateUser(id: string, data: IUpdateUserDTO): Promise<User>;
  deleteUser(id: string): Promise<User[]>;
}

export default IUserRepository;
