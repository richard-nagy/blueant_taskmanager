module.exports = function (db) {
    return (req, res) => {
        db.query("DELETE FROM tasks WHERE idtask = ?", [req.body.id], (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Succesful DELETE from tasks table!");
                res.send();
            }
        });
    };
};
