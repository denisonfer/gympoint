import Sequelize, { Model } from 'sequelize';

class Students extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
      },
      { sequelize }
    );

    return this;
  }

  // static associate(models) {
  //   this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  // }
}

export default Students;
