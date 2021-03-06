const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.Comment, { foreignKey: 'user_id', as: 'comments' });
  }
}

module.exports = User;