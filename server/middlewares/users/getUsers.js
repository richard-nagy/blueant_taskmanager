module.exports = function (app, db) {
    app.get("/user/get", (_, res) => {
        db.query("SELECT * FROM users", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Succesful SELECT from users table!");
                res.send(result);
            }
        });
    });
};
