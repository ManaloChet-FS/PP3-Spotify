const express = require('express');
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`));