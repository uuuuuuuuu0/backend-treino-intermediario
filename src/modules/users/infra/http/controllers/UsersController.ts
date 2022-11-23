import CreateUserService from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name, email, cpf, password,
    } = req.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      email, password, name, cpf,
    });

    const { password: _, ...userWithoutPassword } = user;

    return res.json(userWithoutPassword);
  }
}
