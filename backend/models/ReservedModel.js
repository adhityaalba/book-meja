import { Sequelize } from 'sequelize';
import db from '../config/database.js';

// const Sequelize = require('sequelize');
// const db = require('../config/database.js');

const { DataTypes } = Sequelize;
const BookedUser = db.define(
  'Booked',
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    pax: DataTypes.INTEGER,
    telp: DataTypes.STRING,

    tanggal: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    active: DataTypes.BOOLEAN,
    // waktu: {
    //   type: Sequelize.TIME,
    // },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    freezeTableName: true,
  }
);

const Time = db.define(
  'Optiontime',
  {
    waktu: {
      type: Sequelize.TIME,
      allowNull: true,
    },
    active: DataTypes.BOOLEAN,
    // waktu: {
    //   type: Sequelize.TIME,
    // },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export { BookedUser, Time };
