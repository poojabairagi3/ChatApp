const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const GroupMsg = sequelize.define("groupmsg", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  groupmessage: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
module.exports = GroupMsg;