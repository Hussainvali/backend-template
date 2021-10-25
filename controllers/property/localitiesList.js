
const { getSingleRow, getDataList, getDataBasedOnQuery } = require("../../models/dataModel");

const { getResponseObject } = require("../../helpers/supporter");

const getLocalityList = async (db,user,limit,offset) =>{

    return new Promise((resolve, reject) => {

       let queryData={
           query:`SELECT "objectId","locality" FROM "Property"`
       }

       console.log("queryData",queryData.query)

        getDataBasedOnQuery(db.Property,queryData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
    
}
module.exports.localitiesList = async (req, res) => {

    const response = getResponseObject();
    const { db } = req.headers;
    const { user } = req;

    let data=await getLocalityList(db);

    response.data = "success";
    response.message = "topic created Successfully";
    response.data =data;
    return res.status(200).json(response);

};
