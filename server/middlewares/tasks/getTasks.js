module.exports = function (db) {
    return (_, res) => {
        db.query("SELECT * FROM tasks", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Succesful SELECT from tasks table!");
                res.send(result);
            }
        });
    };
};
