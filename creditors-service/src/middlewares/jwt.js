const { expressjwt: jwt } = require("express-jwt");
const { secreat } = require("../config");
const authjwt = () => {
    // const secret = secreat
    // console.log(secreat);
    return jwt({
        secret:"505d4a6174be33c57765d1100e751a8e27813cb5192c42bcac0d1c89765d021a1faf10ae06ce7daecb932c771a1b1afa136a82a673e561d7decf",
        algorithms: ['HS256'],
    }).unless({
        //non token urls
        path: [],
    })
}

module.exports = authjwt