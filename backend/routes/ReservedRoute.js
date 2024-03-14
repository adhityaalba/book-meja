import express from 'express';
import { getUsers, getUsersbyId, getUsersbyTgl, createUser, updateUser, deleteUser } from '../controllers/ReservedController.js';
import { getTime,updateTime } from '../controllers/TimeController.js';
// const express = require('express');
// const { getUsers, getUsersbyId, createUser, updateUser, deleteUser } = require('../controllers/ReservedController.js');

const router = express.Router();

router.get('/time', getTime);
router.patch('/time/:id', updateTime);
router.get('/booked', getUsers);
router.get('/booked/:id', getUsersbyId);
router.get('/tanggal/:tanggal', getUsersbyTgl);
router.post('/booked', createUser);
router.patch('/booked/:id', updateUser);
router.delete('/booked/:id', deleteUser);

export default router;
