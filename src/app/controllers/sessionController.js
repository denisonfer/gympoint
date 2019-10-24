import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/user';

import authConfig from '../../config/auth';

/** Controle de sessões da aplicação ultilizando a autenticação JWT. */
class SessionController {
  /** Cria a sessão do usuário */
  async store(req, res) {
    /** Padronização dos dados de entrada */
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });
    /** Verificação dos dados recebidos */
    if (!(await schema.isValid(req.body))) {
      return res
        .status(401)
        .json({ error: 'Dados inválidos, tente novamente!' });
    }

    /**
     * request body
     * @const email - email digitado pelo usuário.
     * @const password - senha digitada pelo usuário.
     */
    const { email, password } = req.body;

    /** Busca usuário na tabela User e faz a verifição */
    const user = await User.findOne({ where: { email } });
    /** Verificação de email no banco */
    if (!user) {
      return res.status(401).json({ error: 'Email não autorizado' });
    }
    /** Verificação de senha no banco */
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha não confere' });
    }

    /** Dados do usuário a ser autenticado */
    const { id, name } = user;
    /** Cria a sessão autenticando o usuário e retornado um token  */
    return res.json({
      User: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
