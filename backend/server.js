const express = require('express');
const app = express();

// For reading environment variables
require("dotenv").config();

app.get("/", (req, res) => {
  res.status(200).json({
    "message": "Welcome to the Spotify Searchinator!"
  })
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`));