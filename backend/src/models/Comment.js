const { Model, DataTypes } = require('sequelize');

class Comment extends Model {
  static init(sequelize) {
    super.init({
      text: DataTypes.STRING(1000),
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Comment;