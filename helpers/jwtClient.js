const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const { privateCert, publicCert, jwtValidatityKey,
	JwtIssuer, RefreshTokenIssuer } = require("../config/keys/");

const genJwtToken = payload =>
	new Promise((resolve, reject) => {
		jwt.sign(
			{...payload},
			privateCert,
			{
				algorithm: "RS512",
				expiresIn: "7d",
				issuer: JwtIssuer
			},
			(err, token) => {
				if (err) return reject(new Error("Error while generating Jwt Token."));
				return resolve(token);
			}
		);
	});

const verifyJwtToken = token =>
	new Promise((resolve, reject) => {
		jwt.verify(
			token,
			publicCert,
			{ algorithms: ["RS512"], issuer: JwtIssuer },
			(err, decoded) => {
				if (err) return reject(err);
				return resolve(decoded);
			},
		);
	});

const genRefreshToken = payload =>
	new Promise((resolve, reject) => {
		jwt.sign(
			{...payload},
			privateCert,
			{
				algorithm: "RS512",
				expiresIn: "30d",
				issuer: RefreshTokenIssuer
			},
			(err, token) => {
				if (err) return reject(new Error("Error while generating Refresh Token."));
				return resolve(token);
			}
		);
	});

const verifyRefreshToken = token =>
	new Promise((resolve, reject) => {
		jwt.verify(
			token,
			publicCert,
			{
				algorithms: ["RS512"],
      	issuer: RefreshTokenIssuer
			},
			(err, decoded) => {
				if (err) return reject(err);
				return resolve(decoded);
			},
		);
	});

const getTString = user => user.objectId.toString() + moment(user.lastLogin);

const generateTValue = user => {
	const secret = getTString(user);
	return crypto
		.createHmac("sha256", jwtValidatityKey)
		.update(secret)
		.digest("hex");
};

const compareTValue = (user, tvalue) => {
	const hash = generateTValue(user);
	return tvalue === hash;
};

module.exports = {
	genJwtToken, verifyJwtToken,
	genRefreshToken, verifyRefreshToken,
	generateTValue, compareTValue
};