// const mysql=require('mysql2');

// const pool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node_complete',
//     password:'Mysql@123'
// });
// module.exports=pool.promise();

const{ Sequelize} = require('sequelize');

const sequelize = new Sequelize('node-chat', 'root', 'Mysql@123', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;