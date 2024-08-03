const { expressjwt: jwt } = require("express-jwt");
const { secret } = require("../config");
const authjwt = () => {
    // const secret = secreat
    // console.log(secreat);
    return jwt({
        secret:secret,
        algorithms: ['HS256'],
    }).unless({
        //non token urls
        path: [],
    })
}

module.exports = authjwt