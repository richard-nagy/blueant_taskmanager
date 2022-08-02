const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const authentication = require("./middlewares/authentication.js");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "blueant_db",
});

// require("./middlewares/tasks/getTasks.js")(app, db);
// require("./middlewares/tasks/addTask.js")(app, db);
// require("./middlewares/tasks/deleteTask.js")(app, db);
// require("./middlewares/tasks/setTask.js")(app, db);
require("./middlewares/users/getUsers.js")(app, db);

require("./middlewares/tasks/tasks.js")(app, db);

// app.use("/test_auth", authentication(), (req, res) => {
//     console.log(req.query.test);
//     res.send("req");
// });

app.listen(3001, () => {
    console.log(`Your server is running on port 3001...`);
});
