const { expressjwt: jwt } = require("express-jwt");
const { secret } = require("../config");
const authjwt = () => {
  return jwt({
    secret: secret,
    algorithms: ["HS256"],
  }).unless({
    //non token urls
    path: [],
  });
};

module.exports = authjwt;
