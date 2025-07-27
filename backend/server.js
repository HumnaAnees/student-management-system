require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const feedbackRoutes = require('./routes/feedback.js');
const adminRoutes = require('./routes/admin.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/feedback', feedbackRoutes);
app.use('/admin', adminRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.error(err));