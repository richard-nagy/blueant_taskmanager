import { useEffect, useRef, useState } from "react";
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
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddTask from "./AddTask";

function App() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newTask, setNewTask] = useState(false);
    const [tasks, setTasks] = useState();
    const [users, setUsers] = useState();
    const [updatedTasks, setUpdatedTasks] = useState();

    useEffect(() => {
        axios
            .all([
                axios.get("http://localhost:3001/getTasks"),
                axios.get("http://localhost:3001/getUsers"),
            ])
            .then(
                axios.spread((res1, res2) => {
                    setTasks(res1.data);
                    setUsers(res2.data);
                    setLoading(false);
                })
            )
            .catch(function () {
                setError(true);
                setLoading(false);
            });
    }, []);

    function RefreshTasks() {
        axios
            .get("http://localhost:3001/getTasks")
            .then((res) => {
                setTasks(res.data);
            })
            .catch(function () {
                setError(true);
            });
    }

    function ChangeTask(update) {
        setUpdatedTasks({ ...updatedTasks, [update.idtask]: update });

        let obj = tasks.find((o, i) => {
            if (o.idtask === update.idtask) {
                const newTask = [...tasks];
                newTask[i] = update;
                setTasks(newTask);

                return true;
            }
        });
    }

    function UpdateTasks() {
        axios.put("http://localhost:3001/setTasks", { data: updatedTasks }).catch(function () {
            alert("Error");
        });
    }

    if (loading) {
        return "Loading...";
    }

    if (error) {
        return "Error!";
    }

    return (
        <Container>
            <TableContainer>
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
                                        label="Add task"
                                        sx={{
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
            </TableContainer>
            {updatedTasks && (
                <Chip label="Save Changes" icon={<SaveIcon />} onClick={() => UpdateTasks()} />
            )}
        </Container>
    );
}

export default App;
