const _ = require("lodash");

const errorCodes = require("../helpers/errorCodes");

const checkPhoneNumberOrNot = (inputTxt)=> {
	const phoneRe = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
	const digits = inputTxt.replace(/\D/g, "");
	return phoneRe.test(digits);
};
const validateEmail= (email)=> {
	// eslint-disable-next-line no-useless-escape
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};
const isInteger = (paramType, paramValue)=>
	paramType === "int" && isNaN(paramValue);
const isArray = (paramType, paramValue)=>
	paramType === "array" && (!paramValue || !Array.isArray(paramValue));
const isMobileNumber = (paramType, paramValue)=>
	paramType === "mobile_number" && (!paramValue || _.isEmpty(paramValue) || checkPhoneNumberOrNot(paramValue));
const isEmail = (paramType, paramValue)=>
	paramType === "email" && (!paramValue || _.isEmpty(paramValue) || !validateEmail(paramValue));
const isBoolean = (paramType, paramValue)=>
	paramType === "boolean" && typeof paramValue === "boolean";
const isString = (paramType, paramValue)=>
	paramType === "string" && _.isEmpty(paramValue);

const getMissingFields = (params, body)=> {
	const missingFields = [];
	for (let i = 0; i < params.length; i += 1) {
		const param = params[i];
		const paramType = param.type;
		const paramValue = body[param.value];
		const errorStatus = isInteger(paramType, paramValue) || isArray(paramType, paramValue)
      || isMobileNumber(paramType, paramValue) || isEmail(paramType, paramValue)
      || isBoolean(paramType, paramValue) || isString(paramType, paramValue);
		if (errorStatus) {
			missingFields.push(param.value);
		}
	}
	return missingFields;
};

module.exports = params =>
	(req, res, next) => {
		let body = (req.method === "POST" ? req.body : (req.method === "GET" ? req.query : {}));
		body = Object.assign(body, req.params);

		const missingFields = getMissingFields(params, body);
		if (missingFields.length > 0) {
			const error = new Error(`Please check/fill ${missingFields.join(", ")} fields.`);
			error.status = 200;
			error.error_code = errorCodes.MISSING_PARAMETER;
			next(error);
		} else {
			next();
		}
	};
module.exports.getMissingFields = getMissingFields;