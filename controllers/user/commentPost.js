
const { getResponseObject } = require("../../helpers/supporter");
const { getSingleRow, createData } = require("../../models/dataModel");
const { newObjectId } = require("../../helpers/cryptoUtils");

const checkPostExist = async (db,user,postId) =>{

    return new Promise((resolve, reject) => {
        const where = {
            UserId:user.objectId,
            objectId : postId
        }
        getSingleRow(db.Post, where).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
    
}

const savePost = async (db,objectId,user,createdBy,comment,PostId,TopicId) =>{

    return new Promise((resolve, reject) => {
        const queryData = {
            objectId,
            CreatedBy:createdBy,
            CommentBy:user.objectId,
            comment,
            TopicId,
            PostId
        }
        createData(db.Comment, queryData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
    
}


module.exports.getCommentPostParams = () => [

    { type: "string", value: "post_id" },
    {type: "string",value: "comment" }

]

module.exports.commentPost = async (req, res) => {

    const response = getResponseObject();
    const { db } = req.headers;
    const { user } = req;

    const content=req.body;

    let postId=content.post_id;
    let comment=content.comment;

    let result=await checkPostExist(db,user,postId)

    if(result ==null){
        response.data = "error";
        response.message = "post not  exist";
        response.data = result.name;
        return res.status(200).json(response);
    }

    console.log("result",result);
    let objectId=newObjectId();

    await savePost(db,objectId,user,result.UserId,comment,postId,result.TopicId);

    response.data = "success";
    response.message = "commented Successfully";
    response.data = {};
    return res.status(200).json(response);

};
