const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = function (req, res, next) {
  const token = req.header("authToken");
  if (!token) return res.status(401).send("Acess Denided");

  try {
    const verified = jwt.verify(token, config.tokenSecret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
