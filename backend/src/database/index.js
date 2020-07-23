const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Comment = require('../models/Comment');

const connection = new Sequelize(dbConfig);

User.init(connection);
Comment.init(connection);

User.associate(connection.models);
Comment.associate(connection.models);

module.exports = connection;