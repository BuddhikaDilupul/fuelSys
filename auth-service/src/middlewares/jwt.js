const { expressjwt: jwt } = require("express-jwt");
const authjwt = () => {
    const secret = process.env.secret
    return jwt({
        secret,
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