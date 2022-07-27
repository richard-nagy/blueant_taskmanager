import { Checkbox, TableCell, TableRow } from "@mui/material";
import CircleCheckedFilled from "@mui/icons-material/CheckCircle";
import CircleUnchecked from "@mui/icons-material/CircleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import axios from "axios";

export default function TaskBar({ taskInformation, users, refreshTasks }) {
    const [checked, setChecked] = useState(taskInformation.done === 0 ? false : true);

    function DeleteTask() {
        axios
            .delete("http://localhost:3001/deleteTask", { data: { id: taskInformation.idtask } })
            .then(() => {
                refreshTasks();
            })
            .catch(function () {
                alert("Error");
            });
    }

    return (
        <TableRow>
            <TableCell sx={{ width: "1px", whiteSpace: "nowrap", paddingRight: "0" }}>
                <Checkbox
                    icon={<CircleUnchecked />}
                    checkedIcon={<CircleCheckedFilled />}
                    size="small"
                    color={taskInformation.color}
                    checked={checked}
                    sx={{
                        color: `${taskInformation.color}.main`,
                    }}
                    onChange={() => {
                        setChecked(!checked);
                    }}
                />
            </TableCell>
            <TableCell sx={{ paddingLeft: "0" }}>{taskInformation.task}</TableCell>
            <TableCell align="right">
                {taskInformation.iduser ? taskInformation.iduser : "-"}
            </TableCell>
            <TableCell
                align="right"
                sx={{
                    width: "1px",
                    whiteSpace: "nowrap",
                }}
            >
                <DeleteIcon
                    onClick={() => {
                        DeleteTask();
                    }}
                    sx={{
                        cursor: "pointer",
                        padding: "6px",
                        margin: "0 0 -6px 0",
                        "&:hover": { color: "red" },
                    }}
                />
            </TableCell>
        </TableRow>
    );
}
