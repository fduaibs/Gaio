const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      //campos do usuario
    }, {
      sequelize
    })
  }
}

module.exports = User;