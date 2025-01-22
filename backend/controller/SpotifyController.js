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
  }).catch((err) => {
    switch (err.status) {
      case 400:
        res.status(400).json({"msg": "Invalid search query!"});
        break;
      case 401:
        res.status(401).json({"msg": "Invalid access token!"});
        break;
      default:
        res.status(500).json({"msg": "Server error!"});
    }
  })
}