const expressWinston = require("express-winston");
const moment = require("moment");
const logzIONodeJs = require("logzio-nodejs");

const timeFormatFn = function() {
	return moment().format("LLLL");
};

const newLogger = logzIONodeJs.createLogger({
	token: "ImiSZwGMxoJoriVACRoGCSYMjwiNSlwi",
	json: true,
	timestamp: timeFormatFn(),
	type: `zops-${process.env.NODE_ENV}`
});

const logMessages = (message)=> {
	newLogger.log(message);
};
const expressLoggerOptions = {
	winstonInstance : newLogger,
	meta: true,
	msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}}",
	expressFormat: true,
	json: true,
	colorize: true,
	requestFilter: (req, propName)=> {
		if(propName==="headers") {
			delete req[propName].authorization;
			delete req[propName].db;
		}
		return req[propName];
	},
	requestWhitelist: ["headers", "httpVersion", "method", "query", "originalUrl", "url", "body", "x_correlation_id"],
	responseWhitelist: ["body", "statusCode"],
	ignoreRoute: (req, res)=> req.url === "/"
};

module.exports.logger = expressWinston.logger(expressLoggerOptions);
module.exports.errorLogger = expressWinston.errorLogger(expressLoggerOptions);
module.exports.logMessages = logMessages;