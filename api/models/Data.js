const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    stageName: String,
    realName: String,
    group: String,
    usernameInstagram: String,
    birthplace: String,
    birthDate: String,
    position: String,
    bestSong: String,
    description: String,
  },
  { timestamps: true }
);

const DataModel = mongoose.model("Data", DataSchema);
module.exports = DataModel;
