import { Checkbox, TableCell, TableRow } from "@mui/material";
import CircleCheckedFilled from "@mui/icons-material/CheckCircle";
import CircleUnchecked from "@mui/icons-material/CircleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import AddTask from "./AddTask";

export default function TaskBar({ task, users, refreshTasks, changeTask }) {
    const [checked, setChecked] = useState(!task.done ? false : true);
    const [edit, setEdit] = useState(false);
    const firstRender = useRef(true);

    function DeleteTask() {
        axios
            .delete("http://localhost:3001/deleteTask", { data: { id: task.idtask } })
            .then(() => {
                refreshTasks();
            })
            .catch(function () {
                alert("Error");
            });
    }

    return edit ? (
        <AddTask
            users={users}
            close={() => setEdit(false)}
            refreshTasks={() => refreshTasks}
            startingValues={{ ...task }}
            changeTask={(e) => {
                changeTask(e);
                setEdit(false);
            }}
        />
    ) : (
        <TableRow>
            <TableCell sx={{ width: "1px", whiteSpace: "nowrap", paddingRight: "0" }}>
                <Checkbox
                    icon={<CircleUnchecked />}
                    checkedIcon={<CircleCheckedFilled />}
                    size="small"
                    color={task.color}
                    checked={checked}
                    sx={{
                        color: `${task.color}.main`,
                    }}
                    onChange={() => {
                        setChecked(!checked);
                        changeTask({ ...task, done: !checked });
                    }}
                />
            </TableCell>
            <TableCell sx={{ paddingLeft: "0" }}>{task.task}</TableCell>
            <TableCell align="right">{task.iduser ? task.iduser : "-"}</TableCell>
            <TableCell
                align="right"
                sx={{
                    width: "1px",
                    whiteSpace: "nowrap",
                }}
            >
                <EditIcon
                    onClick={() => {
                        setEdit(true);
                    }}
                    sx={{
                        cursor: "pointer",
                        padding: "6px",
                        margin: "0 0 -6px 0",
                        "&:hover": { color: "primary.main" },
                    }}
                />
                <DeleteIcon
                    onClick={() => {
                        DeleteTask();
                    }}
                    sx={{
                        cursor: "pointer",
                        padding: "6px",
                        margin: "0 0 -6px 0",
                        "&:hover": { color: "error.main" },
                    }}
                />
            </TableCell>
        </TableRow>
    );
}
