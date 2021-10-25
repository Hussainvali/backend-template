const {getDataBasedOnQuery } = require("../models/dataModel");

function getClientByHash(hash, db) {
	return  new Promise((resolve, reject) => {
		const queryData = {
			query: `
        select * from "GCFClient" gc
          where "gc"."Hash" = :hash;
      `,
			replacements: {
				 hash
			}
		};
		getDataBasedOnQuery(db, queryData)
			.then((result)=> resolve( result.length > 0 ? result[0] : null))
			.catch((err)=> reject(err));
	});
}

function authenticate(req, res, next) {
	const hash = req.headers["client-id"];
	if(!hash) {
		const error = new Error("Unauthorized Access");
		error.status = 400;
		error.name = "No authorization Header or bearer token in the http found";
		next(error);
	}

	getClientByHash(hash,req.headers.db)
		.then(client => {
	    if(client == null) {
				const error = new Error("No client exist with given Id.");
				error.status = 401;
				next(error);
			} else if (!client.ActiveStatus) {
				const error = new Error("Client is deactivated!! Please contact Admin");
				error.status = 401;
				next(error);
			} else if (client.ActiveStatus) {
				next();
			}
		}).catch(err => {
			const error = new Error("Unauthorized Access");
			error.status = 400;
			next(err);
		});
}

module.exports = authenticate;