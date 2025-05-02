
// const express = require('express');
// require('dotenv').config();
// const mongoose = require('mongoose');
// const cors = require('cors');
// const passport = require('passport');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const path = require('path');
// const app = express();

// const authRoutes = require('./src/routes/auth.routes');
// const usersRoutes = require('./src/routes/Users.routes');
// const classRoutes = require('./src/routes/Class.routes');
// const resultRoutes = require('./src/routes/result.routes');
// const promoteRoute = require('./src/routes/promote.routes');
// const blogRoute = require('./src/routes/blog.routes');
// const galleryRoute = require('./src/routes/gallery.routes');
// const studentRoute = require('./src/routes/student.routes');
// const coursetRoute = require('./src/routes/Course.routes');
// require('./db');

// // Increase the JSON payload limit
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use(express.static('public'));
// app.use(cookieParser());
// app.use(cors({
//   origin: ['https://alistiqama-university-2vxr.vercel.app', 'http://localhost:3000', 'http://localhost:3001']
// }));
// app.use(passport.initialize());

// const dbURI = "mongodb+srv://superMe:superMe123@alistiqama.iupxq.mongodb.net/test?retryWrites=true&w=majority&appName=alIstiqama";

// // const dbURI = process.env.MONGODB_URI;
// const PORT = process.env.PORT || 3000;
// mongoose.connect(dbURI)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log('App running on port 3000');
//     });
//   })
//   .catch((err) => console.log('Connection error:', err));



// // GridFS Setup
// let gfs;
// mongoose.connection.once('open', () => {
//   gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//     bucketName: 'uploads'
//   });
// });

// app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//   res.json({ message: "Welcome to the API" });
// });

// app.use(usersRoutes);
// app.use(classRoutes);
// app.use(authRoutes);
// app.use(resultRoutes);
// app.use(promoteRoute);
// app.use(blogRoute);
// app.use(studentRoute);
// app.use(coursetRoute);

// module.exports = app;


const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Import routes
const authRoutes = require('./src/routes/auth.routes');
const usersRoutes = require('./src/routes/Users.routes');
const classRoutes = require('./src/routes/Class.routes');
const resultRoutes = require('./src/routes/result.routes');
const promoteRoute = require('./src/routes/promote.routes');
const blogRoute = require('./src/routes/blog.routes');
const galleryRoute = require('./src/routes/gallery.routes');
const studentRoute = require('./src/routes/student.routes');
const coursetRoute = require('./src/routes/Course.routes');

// Load DB config
require('./db');

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use(cors({
  origin: [
    'https://alistiqama-university-2vxr.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true
}));

app.use(passport.initialize());

// MongoDB Connection
const MONGODB_URI = 'mongodb://127.0.0.1:27017/istiqama';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// GridFS Setup (optional, only if you use it)
let gfs;
mongoose.connection.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });
});

// EJS for testing view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.use(authRoutes);
app.use(usersRoutes);
app.use(classRoutes);
app.use(resultRoutes);
app.use(promoteRoute);
app.use(blogRoute);
app.use(galleryRoute); // ← was missing in your code
app.use(studentRoute);
app.use(coursetRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
