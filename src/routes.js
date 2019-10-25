import { Router } from 'express';

import SessionController from './app/controllers/sessionController';
import UserController from './app/controllers/userController';

import authToken from './app/middlewares/authToken';

/**
 * Instancia do Router do express para uso de rotas.
 */
const routes = new Router();

/** Rota para Criar os usuários */
routes.post('/users', UserController.store);
/** Rota para criar a sessão */
routes.post('/sessions', SessionController.store);
/** Rota middleware de validação do token */
routes.use(authToken);

/** Rota para listar todos os usuários */
routes.get('/users', UserController.index);
/** Rota para editar usuário */
routes.put('/users', UserController.update);
/** Rota para deletar usuário */
routes.delete('/users', UserController.delete);

export default routes;
