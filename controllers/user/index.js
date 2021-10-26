let controllerObject = {};

controllerObject = Object.assign(controllerObject, require("./registerUser"));
controllerObject = Object.assign(controllerObject, require("./login"));
controllerObject = Object.assign(controllerObject, require("./createPost"));
controllerObject = Object.assign(controllerObject, require("./postsList"));
controllerObject = Object.assign(controllerObject, require("./userpostsList"));
module.exports = controllerObject;