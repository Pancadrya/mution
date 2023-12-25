const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Data = require("./models/Data");
const cors = require("cors");

dotenv.config();
mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) throw err;
});

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/", (req, res) => {
  res.json("Server Running...");
});

app.get("/datas", async (req, res) => {
  const datas = await Data.find({});
  res.json(datas);
});

app.get("/datas/:id", async (req, res) => {
  const { id } = req.params;
  const datas = await Data.findById(id);
  res.json(datas);
});

app.delete("/datas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedData = await Data.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.json({ message: "Data deleted successfully", deletedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/datas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { stageName, realName, group, usernameInstagram, birthplace, birthDate, position, bestSong, description } = req.body;

    const updatedData = await Data.findByIdAndUpdate(
      id,
      {
        stageName,
        realName,
        group,
        usernameInstagram,
        birthplace,
        birthDate,
        position,
        bestSong,
        description,
      },
      { new: true } // To return the updated document
    );

    if (!updatedData) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json(updatedData); // Send the updated data as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" }); // Send an error response
  }
});

app.post("/data", async (req, res) => {
  try {
    const { stageName, realName, group, usernameInstagram, birthplace, birthDate, position, bestSong, description } = req.body;
    const newData = await Data.create({
      stageName,
      realName,
      group,
      usernameInstagram,
      birthplace,
      birthDate,
      position,
      bestSong,
      description,
    });
    res.status(201).json(newData); // Send a response if the insertion is successful
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" }); // Send an error response
  }
});

app.listen(process.env.PORT || 4040);
