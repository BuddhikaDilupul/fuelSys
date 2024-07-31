const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  try {
    const secret = process.env.secret;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    // jwt.verify(token, secret);
    req.role = decoded.role;
    req.userId = decoded.id;
    console.log(decoded.id, decoded.role);
    next();
  } catch (error) {
    res.status(400).json({ message: "invalid token" });
  }
};
