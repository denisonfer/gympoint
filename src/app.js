import express from 'express';
import routes from './routes';

/**
 * Classe que instância nossa aplicação.
 */
class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  /**
   * @method middlewares
   * Uso de JSON nas requisições.
   */
  middlewares() {
    this.server.use(express.json());
  }

  /**
   * @method routes
   * Roteamento do aplicativo para uso das requisições.
   */
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
