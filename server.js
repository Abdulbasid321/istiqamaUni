
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const authRoutes = require('./src/routes/auth.routes');
const usersRoutes = require('./src/routes/Users.routes');
const classRoutes = require('./src/routes/Class.routes');
const resultRoutes = require('./src/routes/result.routes');
const promoteRoute = require('./src/routes/promote.routes');
const blogRoute = require('./src/routes/blog.routes');
const galleryRoute = require('./src/routes/gallery.routes');
require('./db');

// Increase the JSON payload limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static('public'));
app.use(cookieParser());
app.use(cors({
  origin: ['http://172.20.10.2:8080', 'http://localhost:3000', 'http://localhost:3001']
}));
app.use(passport.initialize());
// const dbURI = 'mongodb://127.0.0.1:27017/testing';
// const dbURI = "mongodb+srv://superMe:superMe123@alistiqama.iupxq.mongodb.net/?retryWrites=true&w=majority&appName=alIstiqama";
const dbURI = "mongodb+srv://superMe:superMe123@alistiqama.iupxq.mongodb.net/test?retryWrites=true&w=majority&appName=alIstiqama";

// const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI)
  .then(() => {
    app.listen(3001, () => {
      console.log('App running on port 3000');
    });
  })
  .catch((err) => console.log('Connection error:', err));

// GridFS Setup
let gfs;
mongoose.connection.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.use(usersRoutes);
app.use(classRoutes);
app.use(authRoutes);
app.use(resultRoutes);
app.use(promoteRoute);
app.use(blogRoute);
app.use(galleryRoute);

module.exports = app;


