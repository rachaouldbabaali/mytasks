const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/myTasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors({ 
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'jwt,Content-Type,Authorization',
 }));

app.use(express.json());
app.use('/api', routes);
app.use('/api', taskRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
