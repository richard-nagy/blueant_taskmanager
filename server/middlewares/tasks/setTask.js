module.exports = function (app, db) {
    app.put("/setTasks", (req, res) => {
        let variables = [];
        let index = 0;
        let text = "UPDATE tasks s JOIN ( ";

        for (const [_, task] of Object.entries(req.body.data)) {
            if (index === 0) {
                text += `SELECT ? as idtask, ? as newTask, ? as newDone, ? as newColor, ? as newIduser `;
            } else {
                text += `SELECT ${task.idtask}, "${task.task}", ${task.done}, "${task.color}", ${task.iduser} `;
            }

            if (index !== Object.keys(req.body.data).length - 1) {
                text += "UNION ALL ";
            }

            variables.push(task.idtask, task.task, task.done, task.color, task.iduser);
            index++;
        }

        text += `) vals ON s.idtask = vals.idtask SET task = newTask, done = newDone, color = newColor, iduser = newIduser;`;

        db.query(
            text,
            variables,

            (err) => {
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
