import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name, email, cpf, password,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      email, password, name, cpf,
    });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      name, email, cpf, password,
    } = req.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      name, email, cpf, password,
    }, id);

    return res.json(user);
  }
}
