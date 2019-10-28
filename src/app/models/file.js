import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    /**
     * Descrição das colunas que serão usadas no front end do app.
     * Recebe 2 parâmetros:
     * {colunas} - Dados que serão manipulados,
     * {sequelize} - conexão com o banco
     */
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3133/files/${this.path}`;
          },
        },
      },
      { sequelize }
    );

    return this;
  }
}

export default File;
