const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Group = sequelize.define('group', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    groupname: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
})
module.exports = Group;