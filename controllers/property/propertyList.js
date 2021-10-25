
const { getSingleRow, getDataList, getDataBasedOnQuery } = require("../../models/dataModel");

const { getResponseObject } = require("../../helpers/supporter");

const getPropertyList = async (db,user,limit,offset) =>{

    return new Promise((resolve, reject) => {

       let queryData={
           query:`SELECT * FROM "Property" ORDER BY "createdAt" desc LIMIT ${limit} OFFSET ${offset}`
       }

       console.log("queryData",queryData.query)

        getDataBasedOnQuery(db.Property,queryData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
    
}

const getTotalProperties = async (db) =>{

    return new Promise((resolve, reject) => {

       let queryData={
           query:`SELECT count(*) FROM "Property"`
       }

        getDataBasedOnQuery(db.Property,queryData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
    
}

module.exports.getTopicListParams = () => [

    { type: "string", value: "page" }

]

module.exports.propertyList = async (req, res) => {

    const response = getResponseObject();
    const { db } = req.headers;
    const { user } = req;

    const content=req.query;
    let limit=content.limit;

    let page=content.page ? parseInt(content.page) : 1;
    let offset=(page ==  1) ? 0: (((page-1)*limit))

    let data=await Promise.all([getPropertyList(db,user,limit,offset),getTotalProperties(db)]);

    response.data = "success";
    response.message = "topic created Successfully";
    response.data = {
        "properties_list":data[0],
        "count":parseInt(data[1][0].count)
    };
    return res.status(200).json(response);

};
