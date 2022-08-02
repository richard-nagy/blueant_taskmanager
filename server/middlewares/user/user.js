const authentication = require("../authentication");
const getUsers = require("./getUser");

module.exports = function (app, db) {
    app.get("/user/get", authentication(), getUsers(db));
};
