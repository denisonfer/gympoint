import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/user';

import authConfig from '../../config/auth';

/** Controle de sessões da aplicação ultilizando a autenticação JWT. */
class SessionController {
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

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    /** Verificação de email no banco */
    if (!user) {
      return res.status(401).json({ error: 'Email não autorizado' });
    }
    /** Verificação de senha no banco */
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha não confere' });
    }

    const { id, name } = user;
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
