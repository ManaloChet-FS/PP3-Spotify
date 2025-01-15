const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const generateRandomString = (num) => {
  let result = "";

  for (let i = 0; i < num; i++) {
    result += charSet[Math.floor(Math.random() * charSet.length)];
  }

  return result;
}

module.exports = {
  generateRandomString
}