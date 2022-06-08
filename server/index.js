const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const authRouter = require('./routes/auth');
const todoRouter = require('./routes/todo');

const middleware = require("./middleware");

const app = express();
const server = http.createServer(app);

const MONGO_URI = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connect database successfully!");
  } catch (error) {
    console.log(error);
  }
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/auth", authRouter);
app.use(middleware);
app.use("/api/todo" , todoRouter);
// app.post("/api/auth/register", authRouter);

server.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
})