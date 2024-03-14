import { Sequelize } from 'sequelize';
import { Time } from '../models/ReservedModel.js';

export const getTime = async (req, res) => {
  try {
    const response = await Time.findAll({
      attributes: ['id', [Sequelize.fn('TIME_FORMAT', Sequelize.col('waktu'), '%H:%i'), 'waktu'], 'active'],
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateTime = async (req, res) => {
  try {
    await Time.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'Data Time Berhasil Ter-update' });
  } catch (error) {
    console.log(error.message);
  }
};
