// import mongoose from "mongoose";

// const timetableSchema = new mongoose.Schema({
//   fileUrl: { type: String, required: true },
//   publicId: { type: String, required: true },
//   fileName: { type: String },
//   fileType: { type: String },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("Timetable", timetableSchema);
const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
  {
    fileUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    fileName: { type: String },
    fileType: { type: String },
  },
  { timestamps: true }
);

const Timetable = mongoose.model("Timetable", timetableSchema);
module.exports = Timetable;
