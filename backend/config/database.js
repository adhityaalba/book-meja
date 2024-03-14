import { Sequelize } from 'sequelize';
// const Sequelize = require('sequelize');

const db = new Sequelize('book_meja', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+07:00',
});

export default db;
