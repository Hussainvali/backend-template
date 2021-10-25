
const { getResponseObject } = require("../../helpers/supporter");
const { getSingleRow, createData } = require("../../models/dataModel");
const { newObjectId } = require("../../helpers/cryptoUtils");
const path = require("path");
// const imageThumbnail = require('image-thumbnail');
const fs=require('fs');
const saveProperty = async (db,propertyData) => {

    return new Promise((resolve, reject) => {
        const queryData = {
            ...propertyData
        }
        // console.log("queryData",queryData);
        createData(db.Property, queryData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })

}

module.exports.addProperty = async (req, res) => {

    const response = getResponseObject();
    const { db } = req.headers;
    const { user } = req;

    let objectId=newObjectId();
    let propertyData = req.body;
    propertyData['objectId']=objectId;
    propertyData['carpetArea']=propertyData['carpet_area']

    let filesInfo = req.files;

    let images = [];
    let thumbnail=[];

    if (filesInfo.lenght == 0) {

        response.data = "error";
        response.message = "please upload atleast one image";
        response.data = result;
        return res.status(200).json(response);
    }

    for (const iterator of filesInfo) {
        images.push(path.join(iterator.destination, iterator.filename))
    }
    let options = { width: 100, height: 100,jpegOptions: { force:true, quality:90 } }
    // for (const iterator of images) {
    //     const result = await imageThumbnail(iterator,options);
    //     const buffer = Buffer.from(result, "base64");
    //     fs.writeFileSync(`property_Image/101/thumbnail${new Date().getTime()}.jpg`, buffer);
    //     thumbnail.push(`property_Image/101/thumbnail${new Date().getTime()}.jpg`)
    // }

    // propertyData['images']=images;
    // propertyData['thumbnail']=thumbnail;

    await saveProperty(db,propertyData);

    response.data = "success";
    response.message = "post created Successfully";
    response.data = {};
    return res.status(200).json(response);

};
