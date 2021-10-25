
const { getResponseObject } = require("../../helpers/supporter");
const { getSingleRow, createData } = require("../../models/dataModel");
const { newObjectId } = require("../../helpers/cryptoUtils");

const checkTopicNameExist = async (db,user,topic_name) =>{

    return new Promise((resolve, reject) => {
        const where = {
            UserId:user.objectId,
            name : topic_name
        }
        getSingleRow(db.Topic, where).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
    
}

const saveTopic = async (db,objectId,user,topic_name) =>{

    return new Promise((resolve, reject) => {
        const queryData = {
            objectId,
            UserId:user.objectId,
            name : topic_name
        }
        createData(db.Topic, queryData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
    
}


module.exports.getCreateTopicParams = () => [

    { type: "string", value: "topic_name" }

]

module.exports.createTopic = async (req, res) => {

    const response = getResponseObject();
    const { db } = req.headers;
    const { user } = req;

    const content=req.body;

    let topicName=content.topic_name.toLowerCase();

    let result=await checkTopicNameExist(db,user,topicName)

    if(result !=null){
        response.data = "error";
        response.message = "topic name already exist";
        response.data = result.name;
        return res.status(200).json(response);
    }
    let objectId=newObjectId();
    await saveTopic(db,objectId,user,topicName)
    response.data = "success";
    response.message = "topic created Successfully";
    response.data = result;
    return res.status(200).json(response);

};
