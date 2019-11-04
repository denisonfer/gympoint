import Help_orders from '../models/help_orders';
import Students from '../models/students';

class Help_ordersController {
  async index(req, res) {
    const student = await Students.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ erro: 'Aluno(a) não encontrado(a).' });
    }
    const help_orders = await Help_orders.findAll({
      where: { student_id: student.id },
      attributes: ['id', 'student_id', 'question', 'answer', 'answer_at'],
      include: [
        {
          model: Students,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    if (!help_orders) {
      return res
        .status(404)
        .json({ erro: 'Não há pedidos para este aluno(a).' });
    }

    return res.json(help_orders);
  }

  async store(req, res) {
    // rota para aluno criar pedido de auxilio
    const student = await Students.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ erro: 'Aluno(a) não encontrado(a).' });
    }

    const help_order = await Help_orders.create({
      student_id: student.id,
      question: req.body.question,
    });

    return res.json(help_order);
  }
}

export default new Help_ordersController();
