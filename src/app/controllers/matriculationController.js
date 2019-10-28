import * as Yup from 'yup';
import { parseISO, addMonths, isBefore } from 'date-fns';
import Matriculation from '../models/matriculation';
import Students from '../models/students';
import Plans from '../models/plans';

class MatriculationController {
  async index(req, res) {
    const matriculation = await Matriculation.findAll({
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
      ],
      include: [
        {
          model: Students,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plans,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });
    return res.json(matriculation);
  }

  async store(req, res) {
    /** Padronização dos dados recebidos */
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });
    /** Validação dos dados recebidos */
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Dados inválidos, tente novamente!' });
    }

    const { student_id, plan_id, start_date } = req.body;

    /** Checagem de aluno */
    const student = await Students.findByPk(student_id);
    if (!student) {
      return res.status(404).json({ erro: 'Aluno não localizado!' });
    }
    /** Checagem de Plano */
    const plan = await Plans.findByPk(plan_id);
    if (!plan) {
      return res.status(404).json({ erro: 'Plano não localizado!' });
    }

    /** Calculo da data final e valor total da matricula */
    const setEnd_date = addMonths(parseISO(start_date), plan.duration);
    const setPrice = plan.price * plan.duration;

    /** Validar data: Não é possível datas passadas */
    if (start_date && parseISO(start_date) < new Date()) {
      return res
        .status(401)
        .json({ error: 'Não é possível cadastrar com datas passadas' });
    }

    const matriculation = await Matriculation.create({
      student_id,
      plan_id,
      start_date,
      end_date: setEnd_date,
      price: setPrice,
    });

    return res.json({
      sucess: 'Matricula realizada com sucesso',
      matriculation,
    });
  }

  async update(req, res) {
    /** Padronização dos dados recebidos */
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });
    /** Validação dos dados recebidos */
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Dados inválidos, tente novamente!' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const matriculation = await Matriculation.findByPk(req.params.id);
    if (!matriculation) {
      return res.status(404).json({ error: 'Matricula não localizada' });
    }
    /** Checagem de aluno */
    const student = await Students.findByPk(student_id);
    if (!student) {
      return res.status(404).json({ erro: 'Aluno não localizado!' });
    }
    /** Checagem de Plano */
    const plan = await Plans.findByPk(plan_id);
    if (!plan) {
      return res.status(404).json({ erro: 'Plano não localizado!' });
    }

    /** Calculo da data final e valor total da matricula */
    const setEnd_date = addMonths(parseISO(start_date), plan.duration);
    const setPrice = plan.price * plan.duration;

    /** Validar data: Não é possível datas passadas */
    if (start_date && parseISO(start_date) < new Date()) {
      return res
        .status(401)
        .json({ error: 'Não é possível cadastrar com datas passadas' });
    }

    await matriculation.update({
      student_id,
      plan_id,
      start_date,
      end_date: setEnd_date,
      price: setPrice,
    });

    return res.json({
      sucess: 'Matricula atualizada com sucesso!',
      matriculation,
    });
  }

  async delete(req, res) {
    const matriculation = await Matriculation.findByPk(req.params.id);
    if (!matriculation) {
      return res.status(404).json({ error: 'Matricula não localizada' });
    }

    await matriculation.destroy();
    return res.json({ sucess: 'Matricula deletada com sucesso!' });
  }
}
export default new MatriculationController();
