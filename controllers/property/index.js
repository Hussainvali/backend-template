let controllerObject = {};


controllerObject = Object.assign(controllerObject, require("./addProperty"));
controllerObject = Object.assign(controllerObject, require("./propertyList"));
controllerObject = Object.assign(controllerObject, require("./localitiesList"));
module.exports = controllerObject;