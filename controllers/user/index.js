let controllerObject = {};

controllerObject = Object.assign(controllerObject, require("./registerUser"));
controllerObject = Object.assign(controllerObject, require("./login"));
controllerObject = Object.assign(controllerObject, require("./createTopic"));
controllerObject = Object.assign(controllerObject, require("./createPost"));
controllerObject = Object.assign(controllerObject, require("./commentPost"));
controllerObject = Object.assign(controllerObject, require("./topicsList"));
controllerObject = Object.assign(controllerObject, require("./postsList"));
module.exports = controllerObject;