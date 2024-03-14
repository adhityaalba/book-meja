import express from 'express';
import cors from 'cors';
import ReservedRoute from './routes/ReservedRoute.js';

// const express = require('express');
// const cors = require('cors');
// const ReservedRoute = require('./routes/ReservedRoute.js');

var app = express();
app.use(cors());
app.use(express.json());
app.use(ReservedRoute);

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html; charset=uts-8');
  res.send('<h1>Hello Work Running</h1>');
});

app.listen(5000, () => console.log('server berjalan ..'));
