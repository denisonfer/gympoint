import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/sessionController';
import UserController from './app/controllers/userController';
import FileController from './app/controllers/fileController';
import StudentController from './app/controllers/studentController';
import PlanController from './app/controllers/planController';
import MatriculationController from './app/controllers/matriculationController';
import ChekinsController from './app/controllers/chekinsController';
import Help_orderController from './app/controllers/help_orderController';
import OrdersManagerController from './app/controllers/ordersManagerController';

import authToken from './app/middlewares/authToken';

/** Instancia do Router do express para uso de rotas. */
const routes = new Router();
const upload = multer(multerConfig);

/** Rota para Criar os usuários */
routes.post('/users', UserController.store);
/** Rota para criar a sessão */
routes.post('/sessions', SessionController.store);

/** Rotas para Chekins */
routes.get('/students/:id/chekins', ChekinsController.index);
routes.post('/students/:id/chekins', ChekinsController.store);

// rotas para os pedidos de auxilio(usuário)
routes.get('/students/:id/help_orders', Help_orderController.index);
routes.post('/students/:id/help_orders', Help_orderController.store);

/** Rota middleware de validação do token */
routes.use(authToken);

/** Rotas para usuários */
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

/** Rotas para alunos */
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

/** Rotas para Planos de matrícula */
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

/** Rotas para Matrícula */
routes.get('/matriculations', MatriculationController.index);
routes.post('/matriculations', MatriculationController.store);
routes.put('/matriculations/:id', MatriculationController.update);
routes.delete('/matriculations/:id', MatriculationController.delete);

// rotas para os pedidos de auxilio(Gympoint)
routes.get('/help_orders/', OrdersManagerController.index);
routes.put('/help_orders/:id/answer', OrdersManagerController.update);

/** Rota para fazer upload de imagem */
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
