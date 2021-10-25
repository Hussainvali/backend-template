const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const path= require('path');

const httpErrors = require("http-errors");
const addHeaders = require("./middlewares/addHeaders");
const {getErrorResponse} = require("./helpers/supporter.js");
const v1Router = require("./v1_routes/index");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(addHeaders());

app.use("/facebook/hello", (req,res, next) => {
	res.json({ message  : `hello world ${  process.env.NODE_ENV}`});
});

app.use("/facebook/v1/", v1Router);


app.use('/property_Image',express.static('property_Image'))
// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
	console.log(err);
	const statusCode = err.status || 500;
	const message = err.message || "Internal Server Error";
	const errCode = err.error_code || "";
	res.status(statusCode)
		.json(getErrorResponse(message,errCode));
});

module.exports = app;
