import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/user';
import File from '../app/models/file';
import Student from '../app/models/students';

const models = [User, File, Student];

/**
 * Classe que instancia a conexão com o banco de dados PostgresSQL
 */
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
