import { Router } from 'express';

/**
 * Instancia do Router do express para uso de rotas.
 */
const routes = new Router();

/**
 * Métodos de roteamento do nosso app.
 */
/** Get: rota para raiz de nossa aplicação, middleware de retorno. */
routes.get('/', (req, res) => {
  res.json({ ok: true });
});

/**
 * Exportação das rotas para uso do nosso app.
 */
export default routes;
