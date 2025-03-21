// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream');

// const conn = mongoose.connect('mongodb://127.0.0.1:27017/schoolsite');

// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('results'); // Name of the bucket to store files
// });

// module.exports = { gfs };


// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream');

// mongoose.connect('mongodb://localhost:27017/testing', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const conn = mongoose.connection;

// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// module.exports = { gfs, conn };



const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/testing');
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Connection error:', err);
    process.exit(1); // Exit the process with failure
  }
};

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Set the collection to use with GridFS
  console.log('GridFS is ready to use');
});

module.exports = { connectDB, gfs, conn };



// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream');

// const conn = mongoose.connection;

// let gfs;

// mongoose.connect('mongodb://127.0.0.1:27017/testing', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('MongoDB connected...');
  
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads'); // Set the collection name for storing files
// }).catch(err => {
//   console.error('MongoDB connection error:', err);
// });

// module.exports = { conn, gfs };
