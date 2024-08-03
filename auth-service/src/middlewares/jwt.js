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
        path: [
            '/auth/v1/login',
            '/auth/v1/',
        ],
    })
}

module.exports = authjwt