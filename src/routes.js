import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/sessionController';
import UserController from './app/controllers/userController';
import FileController from './app/controllers/fileController';
import StudentController from './app/controllers/studentController';

import authToken from './app/middlewares/authToken';

/** Instancia do Router do express para uso de rotas. */
const routes = new Router();
const upload = multer(multerConfig);

/** Rota para Criar os usuários */
routes.post('/users', UserController.store);
/** Rota para criar a sessão */
routes.post('/sessions', SessionController.store);

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

/** Rota para fazer upload de imagem */
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
