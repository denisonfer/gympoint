import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/user';

const models = [User];

/**
 * Classe que instancia a conexão com o banco de dados PostgresSQL
 */
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
