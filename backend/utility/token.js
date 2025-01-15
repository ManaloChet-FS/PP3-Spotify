const isTokenExpired = (expiryDate) => {
  if (!expiryDate) return true;
  const now = new Date().getTime();
  return now >= new Date(expiryDate).getTime();
}

module.exports = {
  isTokenExpired
}