const User = require("../models/User");
const axios = require("axios");
const { generateToken } = require("../utility/jwt");
const { generateRandomString } = require("../utility/generate");

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

exports.login = (req, res) => {
  const authURL = new URL('https://accounts.spotify.com/authorize');

  // Add all required params
  authURL.searchParams.append('response_type', 'code');
  authURL.searchParams.append('client_id', CLIENT_ID);
  authURL.searchParams.append('redirect_uri', REDIRECT_URI);
  // authURL.searchParams.append('scope', 'user-read-private') Can add this to make it a managed app
  authURL.searchParams.append('state', generateRandomString(16));

  res.redirect(authURL);
}

exports.callback = async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    return res.redirect('/login');
  }

  try {
    // Make the request to Spotify's token API
    const authOptions = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      data: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    const { data } = await axios(authOptions);
    const { access_token, refresh_token, expires_in } = data;

    // Get the user's Spotify ID
    const userData = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    });
    const spotify_id = userData.data.id;

    // Create or update the user in the database
    let user = await User.findOne({ spotify_id });
    if (!user) {
      user = await User.create({
        spotify_id,
        access_token,
        refresh_token,
        expires: Date.now() + expires_in * 1000
      });
    } else {
      user.access_token = access_token;
      user.refresh_token = refresh_token;
      user.expires = Date.now() + expires_in * 1000;
      await user.save();
    }

    // Generate a JWT for the user
    const token = generateToken(spotify_id);

    // Set the JWT and other cookies
    res.cookie("jwt", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    });
    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.redirect("/");
  } catch (error) {
    console.error("Error during callback:", error);
    res.redirect("/login");
  }
}