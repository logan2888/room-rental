require('dotenv').config();
const errorHandler = require('./middlewares/error');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const routes = require('./handlers/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

connectDB();

app.get('/', (req, res) => {
  res.send('Room Rental API is running');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});