import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);

usersRouter.get('/', usersController.read);

usersRouter.delete('/:id', usersController.delete);

usersRouter.put('/:id', usersController.update);

export default usersRouter;
