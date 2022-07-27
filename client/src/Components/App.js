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
} from "@mui/material";
import AddTask from "./AddTask";

function App() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newTask, setNewTask] = useState(false);
    const [tasks, setTasks] = useState();
    const [users, setUsers] = useState();

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
                        {tasks.map((object) => {
                            return (
                                <TaskBar
                                    taskInformation={object}
                                    users={users}
                                    refreshTasks={() => RefreshTasks()}
                                    key={object.idtask}
                                />
                            );
                        })}
                        {newTask ? (
                            <AddTask
                                object={users}
                                close={() => setNewTask(false)}
                                refreshTasks={() => RefreshTasks()}
                            />
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>
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
        </Container>
    );
}

export default App;
