const createData = (model, data)=>
	new Promise((resolve, reject)=> {
		model.create(data)
			.then(result=> resolve(result))
			.catch(err=> reject(err));
	});
const updateData = (model, where, updatedData)=>
	new Promise((resolve, reject)=> {
		model.update(updatedData, {
			where
		}).then(data=> resolve(data))
			.catch(err=> reject(err));
	});
const getDataList = (model, where, order, limit, offset)=>
	new Promise((resolve, reject)=> {
		model.findAll({
			where,
			order,
			limit,
			offset
		}).then(result => resolve(result))
			.catch(err=> reject(err));
	});
const getSingleRow = (model, where, order)=>
	new Promise((resolve, reject)=> {
		model.findOne({
			where,
			order,
			raw: true
		}).then(data => resolve(data))
			.catch(err=> reject(err));
	});
const deleteData = (model, where)=>
	new Promise((resolve, reject)=> {
		model.destroy({where})
			.then(result=> resolve(result))
			.catch(err=> reject(err));
	});
const getDataCount = (model, where)=>
	new Promise((resolve, reject)=> {
		model.count({
			where
		}).then(count=> resolve(count))
			.catch(err=> reject(err));
	});
const getDataBasedOnQuery = (model, queryData)=>
	new Promise((resolve, reject)=> {
		model.sequelize.query(queryData.query, {
			replacements: queryData.replacements,
			type: model.sequelize.QueryTypes.SELECT
		}).then(data=> resolve(data))
			.catch(err => reject(err));
	});
const createBulkData = (model, records, options)=>
	new Promise((resolve, reject)=> {
		model.bulkCreate(records, options)
			.then(data=> resolve(data))
			.catch(err => reject(err));
	});
module.exports = {
	createData, createBulkData, updateData, getDataList,
	deleteData, getSingleRow, getDataCount, getDataBasedOnQuery
};