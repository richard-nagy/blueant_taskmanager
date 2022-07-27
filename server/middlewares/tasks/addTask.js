module.exports = function (app, db) {
    app.post("/addTask", (req, res) => {
        db.query(
            "INSERT INTO tasks (task, color, iduser) VALUES (?, ?, ?)",
            [req.body.task, req.body.color, 1],
            (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("siker");
                }
            }
        );
    });
};
