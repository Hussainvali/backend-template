
const { getSingleRow, getDataList, getDataBasedOnQuery } = require("../../models/dataModel");

const { getResponseObject } = require("../../helpers/supporter");

const getPostsList = async (db,user,limit,offset) =>{

    return new Promise((resolve, reject) => {

       let queryData={
           query:`SELECT * FROM "Post" LIMIT ${limit} OFFSET ${offset}`
       }

        getDataBasedOnQuery(db.Post,queryData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
    
}

const getTotalPostsCount = async (db,user) =>{

    return new Promise((resolve, reject) => {

       let queryData={
           query:`SELECT count(*) FROM "Post"`
       }

        getDataBasedOnQuery(db.Post,queryData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
    
}

module.exports.getPostListParams = () => [

    { type: "string", value: "page" }

]

module.exports.postsList = async (req, res) => {

    const response = getResponseObject();
    const { db } = req.headers;
    const { user } = req;

    const content=req.query;

    let page=parseInt(content.page);
    let offset=page == 1 ? 0: (((page-1)*10))
    let limit=10;

    let data=await Promise.all([getPostsList(db,user,limit,offset),getTotalPostsCount(db,user)]);

    response.data = "success";
    response.message = "posts list Successfully";
    response.data = {
        "post_list":data[0],
        "count":parseInt(data[1][0].count)
    };
    return res.status(200).json(response);

};
