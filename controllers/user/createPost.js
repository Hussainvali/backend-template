
const { getResponseObject } = require("../../helpers/supporter");
const { getSingleRow, createData } = require("../../models/dataModel");
const { newObjectId } = require("../../helpers/cryptoUtils");
const path = require("path");

const checkTopicNameExist = async (db, user, topic_name) => {

    return new Promise((resolve, reject) => {
        const where = {
            UserId: user.objectId,
            name: topic_name
        }
        getSingleRow(db.Topic, where).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })

}

const savePost = async (db,objectId,UserId,TopicId,images,name,description) => {

    return new Promise((resolve, reject) => {
        const queryData = {
            objectId,
            UserId,
            TopicId,
            images,
            name,
            description
        }
        createData(db.Post, queryData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })

}


module.exports.getCreatePostParams = () => [

    { type: "string", value: "topic_name" },
    { type: "string", value: "name" },
    { type: "string", value: "description" }

]

module.exports.createPost = async (req, res) => {

    const response = getResponseObject();
    const { db } = req.headers;
    const { user } = req;

    let topicName = req.body.topic_name.toLowerCase();

    let result = await checkTopicNameExist(db, user, topicName)

    if (result == null) {
        response.data = "error";
        response.message = "topic name not found";
        response.data = result;
        return res.status(200).json(response);
    }

    let filesInfo = req.files;


    let objectId=newObjectId();
    let topicId=result.objectId;
    let userId=user.objectId;
    let name=req.body.name;
    let description=req.body.description;
    
    let images = [];

    if (filesInfo.lenght == 0) {

        response.data = "error";
        response.message = "please upload atleast one image";
        response.data = result;
        return res.status(200).json(response);
    }

    for (const iterator of filesInfo) {
        images.push(path.join(iterator.destination, iterator.filename))
    }

    await savePost(db,objectId,userId,topicId,images,name,description);

    response.data = "success";
    response.message = "post created Successfully";
    response.data = {};
    return res.status(200).json(response);

};
