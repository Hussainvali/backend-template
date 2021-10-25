/**
 *
 * @returns {{message: string, data: {}}}
 */
const getResponseObject = ()=> ({
	status: "success",
	message: "",
	data: {},
	errorCode: null
});

const getSuccessResponse = (data,message)=> ({
	status: "success",
	message: message || "",
	data,
});

const getErrorResponse = (message,errCode)=> ({
	status: "error",
	message: message || "",
	data: {},
	errorCode: errCode || ""
});

/**
 *
 * @param n
 * @returns {*}
 */
const generate = (n) => {
	const add = 1;
	let max = 12 - add;
	if ( n > max ) {
		return generate(max) + generate(n - max);
	}
	max        = 10**(n+add);
	const min    = max/10;
	const number = Math.floor( Math.random() * (max - min + 1) ) + min;

	return (`${  number}`).substring(add);
};

module.exports = {
	getResponseObject,
	generate,
	getSuccessResponse,
	getErrorResponse
};