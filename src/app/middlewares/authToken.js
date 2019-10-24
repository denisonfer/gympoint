import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
/**
 * Middleware que faz a autenticação do token do usuário.
 */
export default async (req, res, next) => {
  /** Receber o token enviado no header da requisição   */
  const authHeader = req.headers.authorization;

  /** Verifica se o Token existe */
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não localizado!' });
  }

  /** Armazena o token em uma constante, pois o Bearer não é ultilizado. */
  const [, token] = authHeader.split(' ');

  try {
    /** Armazena o Id que está no payload do token. */
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    /** Ultiliza esse Id como parametro de rota do usuário. */
    req.userId = decoded.id;
    /** Next para que a rota continue se o token foi autenticado com sucesso. */
    return next();
  } catch (error) {
    return res.status(400).json({ error: 'Token inválido!' });
  }
};
