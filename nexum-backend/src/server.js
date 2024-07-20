// server.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./config/db');
const path = require('path');
const cors = require('cors');
const authenticate = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../nexum-frontend/build')));

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRouter');
const imageRoutes = require('./routes/imageRouter');

app.use('/auth', authRoutes);
app.use('/user', authenticate, userRoutes);
app.use('/images', authenticate, imageRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database connected and synchronized');
    app.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
