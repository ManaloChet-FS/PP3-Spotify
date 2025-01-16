const axios = require("axios");

exports.search = (req, res) => {
  axios.get("https://api.spotify.com/v1/search", {
    params: {
      type: 'album,artist,track',
      q: req.query.q,
      limit: 6
    },
    headers: {
      'Authorization': 'Bearer ' + req.cookies.access_token,
      "Content-Type": 'application/json'
    }
  }).then(({ data }) => {
    res.status(200).json(data);
  })
}