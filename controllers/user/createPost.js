
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

const savePost = async (db,objectId,userId,images,description,lat,lng) => {

    return new Promise((resolve, reject) => {
        const queryData = {
            objectId,
            UserId:userId,
            images,
            lat,
            description,
            lng
        }
        createData(db.Post, queryData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })

}


module.exports.getCreatePostParams = () => [

    { type: "string", value: "description" },
    { type: "string", value: "lat" },
    { type: "string", value: "lng" }

]

module.exports.createPost = async (req, res) => {

    const response = getResponseObject();
    const { db } = req.headers;
    const { user } = req;

    let filesInfo = req.files;


    let objectId=newObjectId();
    let userId=user.objectId;
    let description=req.body.description;
    let lat=req.body.lat;
    let lng=req.body.lng;
    
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
    await savePost(db,objectId,userId,images,description,lat,lng);

    response.data = "success";
    response.message = "post created Successfully";
    response.data = {};
    return res.status(200).json(response);

};
