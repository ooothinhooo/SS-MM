// import mongoose from "mongoose";
const mongoose = require("mongoose");

const roomsSchema = mongoose.Schema(
  {
    water: { type: Array, default: [] },
    electricity: { type: Array, default: [] },
    member: { type: Array, default: [] },
  },
  { timestamps: true }
);

const rooms = mongoose.model("rooms", roomsSchema);
module.exports = rooms;
