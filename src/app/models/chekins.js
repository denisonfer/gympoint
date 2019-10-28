import Sequelize, { Model } from 'sequelize';

class Chekins extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async user => {
      /** Antes de salvar o ckekins coloca a data */
      user.date = await new Date();
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Students, {
      foreignKey: 'student_id',
      as: 'student',
    });
  }
}

export default Chekins;
