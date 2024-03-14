import { Sequelize } from 'sequelize';
import { BookedUser } from '../models/ReservedModel.js';

// const Sequelize = require('sequelize');
// const BookedUser = require('../models/ReservedModel.js');

export const getUsers = async (req, res) => {
  try {
    const response = await BookedUser.findAll({
      attributes: {
        include: ['id', 'name', 'email', 'pax', [Sequelize.fn('DATE_FORMAT', Sequelize.col('tanggal'), '%d-%m-%Y'), 'tanggal']],
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsersbyId = async (req, res) => {
  try {
    const response = await BookedUser.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsersbyTgl = async (req, res) => {
  try {
    const response = await BookedUser.findAll({
      where: {
        tanggal: req.params.tanggal,
      },
    });
    res.status(200).json({
      exists: response.length > 0, // Jika panjang response lebih dari 0, berarti tanggal sudah ada
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = async (req, res) => {
  try {
    await BookedUser.create(req.body);
    res.status(201).json({ msg: 'Data Booking Berhasil Terbuat' });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    await BookedUser.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'Data Booking Berhasil Ter-update' });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await BookedUser.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'Data Booking Berhasil Ter-hapus' });
  } catch (error) {
    console.log(error.message);
  }
};
