const uuid = require("node-uuid");
const appRoot = require("app-root-path");

const db = require(`${appRoot}/models/index`);

module.exports = ()=> (req, res, next)=> {
	req.headers.db = db;

	// adding correlation id to headers
	if (req && !req.headers["x-correlation-id"]) {
		req.x_correlation_id = uuid();
		res.setHeader("X-Correlation-ID", req.x_correlation_id);
	}
	return next();
};