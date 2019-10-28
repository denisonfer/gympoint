import { parseISO, subDays } from 'date-fns';
import { Op } from 'sequelize';
import Chekins from '../models/chekins';
import Students from '../models/students';

class ChekinsController {
  async index(req, res) {
    const chekins = await Chekins.findAll({
      where: { student_id: req.params.id },
      attributes: ['id', 'student_id', 'date'],
      include: [
        {
          model: Students,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(chekins);
  }

  async store(req, res) {
    const student = await Students.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Aluno não localizado!' });
    }
    const chekin = await Chekins.findAll({
      where: { student_id: student.id },
    });

    const pastDay = subDays(new Date(), 7);
    const countChekin = await Chekins.findAndCountAll({
      where: {
        student_id: student.id,
        date: {
          [Op.between]: [pastDay, new Date()],
        },
      },
    });
    if (countChekin.count >= 5) {
      return res.status(401).json({ error: 'Limite de chekins ultrapassado!' });
    }

    await Chekins.create({ student_id: student.id });

    return res.json({
      success: 'Ckekin realizado!',
      chekin,
    });
  }
}
export default new ChekinsController();
