const { getResponseObject } = require("../../helpers/supporter");
const md5 = require("md5");
const { createData, getDataList, getDataCount } = require("../../models/dataModel");
const { newObjectId } = require("../../helpers/cryptoUtils");
module.exports.registerUserParams = () =>
	[
		{ type: "string", value: "firstname" },
		{ type: "string", value: "lastname" },
		{ type: "email", value: "email" },
		{ type: "string", value: "password" },
		{ type: "string", value: "dob" },
		{ type: "string", value: "gender" }

	];

const createUser = async (db, regObject) => {
	return new Promise((resolve, reject) => {
		createData(db.Registration, regObject)
			.then((data) => {
				resolve(data);
			}).catch((err) => {
				reject(err)
			});
	});

}

const checkEmailExist = async (db, email) => {
	return new Promise((resolve, reject) => {
		getDataCount(db.Registration, { email })
			.then((data) => {
				resolve(data);
			}).catch((err) => {
				reject(err)
			});
	});

}
module.exports.registerUser = async (req, res, next) => {
	const response = getResponseObject();

	const content = req.body;
	const { db } = req.headers;

	let regObj = {
		firstName: content.firstname,
		lastName: content.lastname,
		password: md5(content.password),
		email: content.email,
		textPassword: content.password,
		gender: content.gender,
		dob: content.dob,
		objectId: newObjectId()
	}

	let data = await checkEmailExist(db, regObj.email)

	if (data > 0) {
		response.status = "error";
		response.message = "Email already exist";
		response.data = {};
		return res.status(200).json(response);
	}
	await createUser(db, regObj)

	response.status = "success";
	response.message = "Registration Sucess";
	response.data = {};
	return res.status(200).json(response);
};