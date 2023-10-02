const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Chat = sequelize.define('chat', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    message:{
        type: Sequelize.STRING,
    }
})
module.exports = Chat;