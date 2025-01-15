const express = require("express");
const router = express.Router();
const { login, callback, search } = require("../controller/Spotify");

router.get("/login", login);
router.get("/callback", callback);

module.exports = router;