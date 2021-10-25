
const { getSingleRow, getDataList, getDataBasedOnQuery } = require("../../models/dataModel");

const { getResponseObject } = require("../../helpers/supporter");

const getTopicsList = async (db,user,limit,offset) =>{

    return new Promise((resolve, reject) => {

       let queryData={
           query:`SELECT * FROM "Topic" WHERE "UserId"='${user.objectId}' LIMIT ${limit} OFFSET ${offset}`
       }

        getDataBasedOnQuery(db.Topic,queryData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
    
}

const getTotalTopicsCount = async (db,user) =>{

    return new Promise((resolve, reject) => {

       let queryData={
           query:`SELECT count(*) FROM "Topic" WHERE "UserId"='${user.objectId}'`
       }

        getDataBasedOnQuery(db.Topic,queryData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
    
}

module.exports.getTopicListParams = () => [

    { type: "string", value: "page" }

]

module.exports.topicsList = async (req, res) => {

    const response = getResponseObject();
    const { db } = req.headers;
    const { user } = req;

    const content=req.query;

    let page=parseInt(content.page);
    let offset=page == 1 ? 0: (((page-1)*10))
    let limit=10;

    let data=await Promise.all([getTopicsList(db,user,limit,offset),getTotalTopicsCount(db,user)]);

    response.data = "success";
    response.message = "topic created Successfully";
    response.data = {
        "topics_list":data[0],
        "count":parseInt(data[1][0].count)
    };
    return res.status(200).json(response);

};
