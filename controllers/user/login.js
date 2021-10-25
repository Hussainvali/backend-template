const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwtConfig.json");
const { getResponseObject } = require("../../helpers/supporter");


module.exports.getLoginParams = () => [

    { type: "string", value: "email" },
    { type: "string", value: "password" },

]

module.exports.login = async (req, res) => {

    const response = getResponseObject();
    const { user } = req;
    delete user.password;

    const token = jwt.sign(user, jwtConfig.secret, { issuer: jwtConfig.issuer, expiresIn: "7d" });
    response.message = "successfully logged in";
    response.data.token = token;


    return res.status(200).json(response);

};
