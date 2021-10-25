const express = require("express");

const router = express.Router();
const paramValidator = require("../../middlewares/paramsValidator");
const { catchErrors } = require("../../middlewares/errorHandlers");
const controller = require("../../controllers/property");
const passportClient = require("../../middlewares/passportClient");
const upload= require('../../middlewares/uploadProperty')

//create post
router.post("/add-property",upload.array('file',5),catchErrors(controller.addProperty));

router.get("/property-list",catchErrors(controller.propertyList));

// locality list for search

router.get("/locality-list",catchErrors(controller.localitiesList));
module.exports = router;
