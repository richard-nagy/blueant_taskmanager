import { useEffect, useState } from "react";
import axios from "axios";
import TaskBar from "./TaskBar";
import AddIcon from "@mui/icons-material/Add";
import {
    Chip,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import AddTask from "./AddTask";
import axiosApi from "../../apis/axiosApi";

export default function TaskManager() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newTask, setNewTask] = useState(false);
    const [tasks, setTasks] = useState();
    const [users, setUsers] = useState();
    const [updatedTasks, setUpdatedTasks] = useState();

    useEffect(() => {
        axiosApi(
            ["get", "get"],
            ["task/get", "user/get"],
            [null, null],
            (res1, res2) => {
                setTasks(res1.data);
                setUsers(res2.data);
                setLoading(false);
            },
            () => {
                setLoading(false);
                setError(true);
            }
        );
    }, []);

    if (loading) {
        return "Loading...";
    }

    if (error) {
        return "Error!";
    }

    function RefreshTasks() {
        axiosApi(
            "get",
            "task/get",
            null,
            (res) => setTasks(res.data),
            () => setError(true)
        );
    }

    function ChangeTask(update) {
        setUpdatedTasks({ ...updatedTasks, [update.idtask]: update });

        tasks.find((o, i) => {
            if (o.idtask === update.idtask) {
                const newTask = [...tasks];
                newTask[i] = update;
                setTasks(newTask);
                return true;
            }
            return false;
        });
    }

    function UpdateTasks() {
        axiosApi(
            "put",
            "task/set",
            { data: updatedTasks },
            () => {
                setUpdatedTasks();
            },
            () => alert("Error")
        );
    }

    return (
        <Container sx={{ mt: 10 }}>
            <div
                style={{
                    left: 0,
                    top: 0,
                    position: "absolute",
                    width: "100vw",
                    height: "5px",
                    backgroundColor: "orangered",
                }}
            />

            <TableContainer>
                <Typography sx={{ marginLeft: "20px", fontWeight: "bold" }} variant="h5">
                    Today
                </Typography>
                <Table>
                    <TableBody>
                        {tasks.map((taskMap) => {
                            return (
                                <TaskBar
                                    task={taskMap}
                                    users={users}
                                    refreshTasks={() => RefreshTasks()}
                                    key={taskMap.idtask}
                                    changeTask={(e) => ChangeTask(e)}
                                />
                            );
                        })}
                        {newTask ? (
                            <AddTask
                                users={users}
                                close={() => setNewTask(false)}
                                refreshTasks={() => RefreshTasks()}
                                addNew={true}
                            />
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <Chip
                                        icon={<AddIcon style={{ color: "orangered" }} />}
                                        label="Add Task"
                                        sx={{
                                            fontWeight: "bold",
                                            backgroundColor: "white",
                                            cursor: "pointer",
                                            "&:hover": {
                                                backgroundColor: "whitesmoke",
                                            },
                                        }}
                                        onClick={() => {
                                            setNewTask(true);
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {updatedTasks && (
                    <Chip
                        label="Save Changes"
                        icon={<SaveIcon />}
                        onClick={() => UpdateTasks()}
                        sx={{ m: 1, float: "right" }}
                        variant="outlined"
                        color="primary"
                    />
                )}
            </TableContainer>
        </Container>
    );
}
