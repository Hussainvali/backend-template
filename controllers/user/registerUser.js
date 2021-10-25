const { getResponseObject } = require("../../helpers/supporter");
const md5 = require("md5");
const { createData} = require("../../models/dataModel");
const { newObjectId } = require("../../helpers/cryptoUtils");
module.exports.registerUserParams = ()=>
	[
		{ type: "string", value: "name" },
		{ type: "email", value: "email" },
		{ type: "string", value: "password" }

	];

const createUser = async (db,objectId,name,email,password) => {
	return new Promise((resolve, reject) => {
		createData(db.User, {objectId,name,email,password})
			.then((data) => {
				resolve(data);
			}).catch((err) => {
				reject(err)
			});
	});

}
module.exports.registerUser = async (req, res, next)=> {
	const response = getResponseObject();

	const  content=req.body;
	const { db } = req.headers;
	let email=content.email;
	let password=md5(content.password);
	let name =content.name;
	let objectId=newObjectId()

	await createUser(db,objectId,name,email,password)
	
	response.status = "success";
	response.message = "User Created Successfully";
	response.data = {};
	return res.status(200).json(response);
};