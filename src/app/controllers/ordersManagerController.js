import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Help_orders from '../models/help_orders';
import Students from '../models/students';
import Mail from '../../lib/mail';

class OrdersManagerController {
  async index(req, res) {
    // rota para listar todos os pedidos de auxilio sem resposta
    const help_orders = await Help_orders.findAll({
      where: { answer: null },
      attributes: ['id', 'student_id', 'question', 'answer', 'answer_at'],
      include: [
        {
          model: Students,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    return res.json(help_orders);
  }

  async update(req, res) {
    // rota para resposta da academia
    const help_order = await Help_orders.findByPk(req.params.id, {
      attributes: ['id', 'student_id', 'question', 'answer', 'answer_at'],
      include: [
        {
          model: Students,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    if (!help_order) {
      return res.status(404).json({ erro: 'Pedido não localizado!' });
    }
    const answer = await help_order.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });

    /** Envio de email */
    await Mail.sendMail({
      to: `${help_order.student.name} <${help_order.student.email}>`,
      subject: 'Seu Pedido foi respondido',
      template: 'answer',
      context: {
        student: help_order.student.name,
        question: help_order.question,
        answer: help_order.answer,
        date: format(help_order.answer_at, "dd 'de' MMMM 'de' yyy", {
          locale: pt,
        }),
      },
    });

    return res.json({
      mensagem: 'Resposta enviada com sucesso!',
      answer,
    });
  }
}

export default new OrdersManagerController();
