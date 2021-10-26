const express = require("express");

const router = express.Router();

const userRouter = require("./user/");

router.use("/user", userRouter);

// router.use("/propery", propertyRouter);

module.exports = router;