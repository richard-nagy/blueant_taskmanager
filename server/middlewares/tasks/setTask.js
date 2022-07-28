module.exports = function (app, db) {
    app.put("/setTasks", (req, res) => {
        let index = 0;

        let text = "UPDATE tasks s JOIN ( ";

        for (const [_, task] of Object.entries(req.body.data)) {
            if (index === 0) {
                text += `SELECT ${task.idtask} as idtask, "${task.task}" as newTask, ${task.done} as newDone, "${task.color}" as newColor, ${task.iduser} as newIduser `;
            } else {
                text += `SELECT ${task.idtask}, "${task.task}", ${task.done}, "${task.color}", ${task.iduser} `;
            }

            if (index !== Object.keys(req.body.data).length - 1) {
                text += "UNION ALL ";
            }

            index++;
        }

        text += `) vals ON s.idtask = vals.idtask SET task = newTask, done = newDone, color = newColor, iduser = newIduser;`;

        db.query(
            text,

            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Succesful UPDATE in tasks table!");
                    res.send();
                }
            }
        );
    });
};
