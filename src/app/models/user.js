import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

/**
 * Model de usuário(user) para realizar a manipulação dos dados na tabela
 *  do banco de dados
 */
class User extends Model {
  /**
   * @Method init
   * inicia nosso model
   * @param sequelize - conexão com o banco
   */
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
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      { sequelize }
    );
    /** Realiza a criptografia na senha gerando um hash através do bcrypt */
    this.addHook('beforeSave', async user => {
      /** Antes de criptografar verifica se o password foi recebido */
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  /** Verificação de senha
   * @param {string} password - senha digitada pelo usuário
   */
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
