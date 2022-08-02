const authentication = require("../authentication");
const addTask = require("./addTask");
const deleteTask = require("./deleteTask");
const getTasks = require("./getTasks");
const setTask = require("./setTask");

module.exports = function (app, db) {
    app.get("/task/get", authentication(), getTasks(db));

    app.post("/task/add", authentication(), addTask(db));

    app.delete("/task/delete", authentication(), deleteTask(db));

    app.put("/task/set", authentication(), setTask(db));
};
