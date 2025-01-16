const express = require("express");
const router = express.Router();
const jwt = require("../middlewares/verifyJWT"); 
const { search } = require("../controller/SpotifyController");

router.get("/search", jwt, search);

module.exports = router;