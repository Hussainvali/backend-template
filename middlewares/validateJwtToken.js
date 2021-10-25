const appRoot = require("app-root-path");

const errorCodes = require(`${appRoot}/helpers/errorCodes.js`);
const { verifyJwtToken, compareTValue } = require(`${appRoot}/helpers/jwtClient`);
const isError = require(`${appRoot}/helpers/isError`);
const {getDataBasedOnQuery } = require("../models/dataModel");

const re = /(\S+)\s+(\S+)/;

const AUTH_HEADER = "authorization";
const BEARER_AUTH_SCHEME = "bearer";

function getUserById(userId, db) {
	return  new Promise((resolve, reject) => {
		const queryData = {
			query: `
        select * from "Student" 
          join "Batch"
          on "Student"."Batch" = "Batch"."objectId"
          where "Student"."objectId" = :userId;
      `,
			replacements: {
				userId
			}
		};
		getDataBasedOnQuery(db, queryData)
			.then((result)=> resolve( result.length > 0 ? result[0] : null))
			.catch((err)=> reject(err));

	});
}

function parseAuthHeader(hdrValue) {
	if (typeof hdrValue !== "string") {
		return null;
	}
	const matches = hdrValue.match(re);
	return matches && { scheme: matches[1], value: matches[2] };
}

const fromAuthHeaderWithScheme = function (authScheme) {
	const authSchemeLower = authScheme.toLowerCase();
	return function (request) {
		let token = null;
		if (request.headers[AUTH_HEADER]) {
			const authParams = parseAuthHeader(request.headers[AUTH_HEADER]);
			if (authParams && authSchemeLower === authParams.scheme.toLowerCase()) {
				token = authParams.value;
			}
		}
		return token;
	};
};

const fromAuthHeaderAsBearerToken = function () {
	return fromAuthHeaderWithScheme(BEARER_AUTH_SCHEME);
};
const jwtFromRequest = fromAuthHeaderAsBearerToken();

async function validateJWTToken(token, req) {
	if (token == null) {
		return new Error("Token Value Missing");
	}
	const decodedToken = await verifyJwtToken(token)
		.catch(err => err);
	if (isError(decodedToken)) {
		return { is_success : false ,msg: "jwt is not valid anymore"};
	}
	if (decodedToken == null) {
		return new Error("Token cannot be decoded");
	}
	const {id, jwtID} = decodedToken;
	const user = await getUserById(id.toString(), req.headers.db);
	if(!user) {
	  return { is_success: false, msg: "This user no longer existed" };
	}
	const isValidTValue = compareTValue(user, jwtID);
	if (!isValidTValue) {
		return { is_success : false ,msg: "Session expired"};
	}
	req.headers.user = user;
	return { is_success : true, msg: "valid" };
}

function authenticate(req, res, next) {
	const token = jwtFromRequest(req);

	if (token == null) {
		const error = new Error("Unauthorized Access");
		error.status = 400;
		error.name = "No authorization Header or bearer token in the http found";
		next(error);
	}
	validateJWTToken(token, req)
		.then(result => {
			if (!result.is_success) {
				const error = new Error(result.msg);
				error.status = 401;
				error.error_code = errorCodes.AUTH_JWT_INVALID;
				next(error);
			} else if (result.is_success) {
				next();
			}
		})
		.catch(err => {
			const error = new Error("Unauthorized Access");
			error.status = 400;
			next(err);
		});
}

module.exports = authenticate;