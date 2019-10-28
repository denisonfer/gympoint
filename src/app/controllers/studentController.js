import * as Yup from 'yup';
import Student from '../models/students';

class StudentController {
  async index(req, res) {
    const users = await Student.findAll({
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
    });

    return res.json(users);
  }

  async store(req, res) {
    /** Padronização dos dados recebidos */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });
    /** Validação dos dados recebidos */
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Dados inválidos, tente novamente!' });
    }
    /** Validação de email */
    if (req.body.email) {
      const user = await Student.findOne({ where: { email: req.body.email } });
      if (user) {
        return res
          .status(401)
          .json({ error: 'Email já cadastrado no sistema!' });
      }
    }
    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    /** Padronização dos dados recebidos */
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });
    /** Validação dos dados recebidos */
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Dados inválidos, tente novamente!' });
    }

    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Aluno não localizado!' });
    }
    /** Validação de email */
    if (req.body.email !== student.email) {
      const checkUser = await Student.findOne({
        where: { email: req.body.email },
      });
      if (checkUser) {
        return res.status(401).json({ erro: 'Email já cadastrado!' });
      }
    }

    await student.update(req.body);

    return res.json({ success: 'Aluno atualizado com sucesso!', student });
  }
}

export default new StudentController();
