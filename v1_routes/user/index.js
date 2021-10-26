const express = require("express");

const router = express.Router();
const paramValidator = require("../../middlewares/paramsValidator");
const { catchErrors } = require("../../middlewares/errorHandlers");
const controller = require("../../controllers/user/");
const passportClient = require("../../middlewares/passportClient");
const upload= require('../../middlewares/uploadProperty')


//register user
router.post("/register", paramValidator(controller.registerUserParams()), catchErrors(controller.registerUser));
//login 
router.post("/login", paramValidator(controller.getLoginParams()), passportClient.login,catchErrors(controller.login));

//create post
router.post("/add-post",passportClient.jwtAuthorize, upload.array('file',10),paramValidator(controller.getCreatePostParams()),catchErrors(controller.createPost));


// // topics list
router.get("/feed",passportClient.jwtAuthorize, catchErrors(controller.getUserPostList));

// post list with comments
router.get("/get-posts-list", paramValidator(controller.getPostListParams()),passportClient.jwtAuthorize, catchErrors(controller.postsList));



module.exports = router;