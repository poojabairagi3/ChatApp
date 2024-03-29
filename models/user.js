const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique:true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phonenumber:{
        type:Sequelize.INTEGER
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmine:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
    
})
module.exports = User;