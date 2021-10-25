const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname  }/../config/sequelize.json`)[env];
const db = {};

const sequelize = new Sequelize(config.database, process.env.DB_USER, process.env.DB_PASSWORD, config);

fs
	.readdirSync(`${__dirname}/schema`)
	.filter(file => (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js"))
	.forEach(file => {
		const model = sequelize.import(path.join(`${__dirname}/schema`, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;

module.exports = db;
