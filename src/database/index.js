import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/user';

/** @const models - Array com todos os models da aplicação */
const models = [User];

/**
 * Classe que instancia a conexão com o banco de dados PostgresSQL
 */
class Database {
  constructor() {
    this.init();
  }

  /**
   * @method init
   * Inicializa a conexão com o banco de dados e carrega os Models
   */
  init() {
    /** instancia da conexão com o banco */
    this.connection = new Sequelize(databaseConfig);

    /** Percorre o array de models e ativa o init */
    models.map(model => model.init(this.connection));
  }
}
/**
 * Exporta a conexão do banco para ser importado no App.js
 */
export default new Database();
