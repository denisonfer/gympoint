import * as Yup from 'yup';
import Plan from '../models/plans';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    /** Padronização dos dados recebidos */
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });
    /** Validação dos dados recebidos */
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Dados inválidos, tente novamente!' });
    }
    /** Validação do título do plano */
    if (req.body.title) {
      const checkPlan = await Plan.findOne({
        where: { title: req.body.title },
      });
      if (checkPlan) {
        return res
          .status(401)
          .json({ error: 'Já existe um plano cadastrado com esse título' });
      }
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async update(req, res) {
    /** Padronização dos dados recebidos */
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });
    /** Validação dos dados recebidos */
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Dados inválidos, tente novamente!' });
    }
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: 'Plano não localizado!' });
    }
    /** Validação do título do plano */
    if (req.body.title !== plan.title) {
      const checkPlan = await Plan.findOne({
        where: { title: req.body.title },
      });
      if (checkPlan) {
        return res
          .status(401)
          .json({ error: 'Já existe um plano cadastrado com esse título' });
      }
    }

    await plan.update(req.body);

    return res.json({ success: 'Plano atualizado com sucesso', plan });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: 'Plano não localizado!' });
    }
    await plan.destroy();

    return res.json({ success: 'Plano deletado com sucesso!' });
  }
}

export default new PlanController();
