const { verifyToken } = require("../utility/jwt");
const axios = require("axios");
const User = require("../models/User");
require("dotenv").config();

const { CLIENT_ID, CLIENT_SECRET } = process.env;

const jwt = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const { id } = await verifyToken(token);

    const user = await User.findOne({ spotify_id: id });

    if (!user) {
      return res.status(401).json({
        msg: "No user found! Please login!"
      });
    }

    if (new Date().getTime() >= new Date(user.expires).getTime()) {
      const authOptions = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        data: {
          grant_type: "refresh_token",
          refresh_token: user.refresh_token
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
        },
        json: true
      }

      await axios(authOptions)
        .then(({data}) => {
          const { access_token, expires_in } = data;

          res.cookie("access_token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });

          user.access_token = access_token;
          user.expires = Date.now() + expires_in * 1000;
          user.save();
        })
        .catch((err) => console.log(err));
    }

    next();
  } catch (err) {
    return res.status(500).json({
      error: "Error has occurred"
    });
  }
}

module.exports = jwt;