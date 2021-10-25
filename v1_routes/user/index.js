const express = require("express");

const router = express.Router();
const paramValidator = require("../../middlewares/paramsValidator");
const { catchErrors } = require("../../middlewares/errorHandlers");
const controller = require("../../controllers/user/");
const passportClient = require("../../middlewares/passportClient");
const upload= require('../../middlewares/upload')


//register user
router.post("/register", paramValidator(controller.registerUserParams()), catchErrors(controller.registerUser));
//login 
router.post("/login", paramValidator(controller.getLoginParams()), passportClient.login,catchErrors(controller.login));

// create topic
router.post("/create-topic", paramValidator(controller.getCreateTopicParams()),passportClient.jwtAuthorize, catchErrors(controller.createTopic));

//create post
router.post("/create-post",passportClient.jwtAuthorize, upload.array('file',5),paramValidator(controller.getCreatePostParams()),catchErrors(controller.createPost));

// comment post
router.post("/comment-post", paramValidator(controller.getCommentPostParams()),passportClient.jwtAuthorize, catchErrors(controller.commentPost));


// topics list
router.get("/get-topics-list", paramValidator(controller.getTopicListParams()),passportClient.jwtAuthorize, catchErrors(controller.topicsList));

// post list with comments
router.get("/get-posts-list", paramValidator(controller.getPostListParams()),passportClient.jwtAuthorize, catchErrors(controller.postsList));



module.exports = router;