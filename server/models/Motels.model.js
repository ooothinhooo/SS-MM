// import mongoose from "mongoose";
const mongoose = require("mongoose");

const MotelsSchema = mongoose.Schema(
  {
    host_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Rom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
      required: true,
    },
  },
  { timestamps: true }
);

const Motels = mongoose.model("motels", MotelsSchema);
module.exports = Motels;
