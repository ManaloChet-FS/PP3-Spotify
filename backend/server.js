const express = require('express');
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();

const { MONGODB_URI, PORT } = process.env;

const app = express();

mongoose.connect(MONGODB_URI).then(() => console.log("Connected to DB!"));

app.use(cookieParser());
app.use(cors());

const authRouter = require("./routes/AuthRoutes");
app.use('/auth', authRouter);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
})

const port = PORT || 3001;
app.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`));

module.exports = app;