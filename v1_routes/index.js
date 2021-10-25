const express = require("express");

const router = express.Router();

const userRouter = require("./user/");
const propertyRouter = require("./propery");

router.use("/user", userRouter);

// router.use("/propery", propertyRouter);

module.exports = router;