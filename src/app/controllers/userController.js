import * as Yup from 'yup';
import User from '../models/user';
import File from '../models/file';

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(users);
  }

  async store(req, res) {
    /** Padronização dos dados */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });
    /** Validação dos dados de entrada */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Dados inválidos, verifique os dados e tente novamante',
      });
    }
    const { id, name, email, password } = await User.create(req.body);

    return res.json({ id, name, email, password });
  }

  async update(req, res) {
    /** Padronização dos dados */
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().when('oldPassword', (oldPassword, field) => {
        return oldPassword ? field.required() : field;
      }),
      confirm_password: Yup.string().when('password', (password, field) => {
        return password ? field.required().oneOf([Yup.ref('password')]) : field;
      }),
    });
    /** Validação dos dados de entrada */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Dados inválidos, verifique os dados e tente novamante',
      });
    }
    const { name, email, oldPassword, password } = req.body;

    const user = await User.findByPk(req.userId);
    /** Validação de email */
    if (email !== user.email) {
      const checkUser = await User.findOne({ where: { email } });
      if (checkUser) {
        return res
          .status(401)
          .json({ error: 'Email já em uso por outro usuário' });
      }
    }
    /** Validação de senha */
    if (!oldPassword || !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha não confere' });
    }
    const { id } = await user.update(req.body);
    return res.json({
      Success: 'usuário atualizado com sucesso!',
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);
    /** Veririca se usuário existe */
    if (!user) {
      return res.status(400).json({ error: 'Usuário não localizado!' });
    }
    await user.destroy();

    return res.json({ Sucess: 'Usuário deletado com sucesso!' });
  }
}
export default new UserController();
