const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "blueant_db",
});

/*
TODO: Request the middlewares
require("./users.js")(app, db);
*/

require("./middlewares/tasks.js")(app, db);

app.listen(3001, () => {
    console.log(`Your server is running on port 3001...`);
});
