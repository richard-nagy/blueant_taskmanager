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
    TableHead,
    TableRow,
} from "@mui/material";
import AddTask from "./AddTask";

function App() {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        axios.get("http://localhost:3001/getTasks").then((res) => {
            setTasks(res.data);
        });

        axios.get("http://localhost:3001/getUsers").then((res) => {
            setUsers(res.data);
            setLoading(false);
        });
    }, []);

    if (loading === true) {
        return "Loading...";
    }

    console.log(users);

    return (
        <Container>
            <TableContainer>
                <Table>
                    <TableBody>
                        {tasks.map((object) => {
                            return <TaskBar object={object} key={object.idtasks} />;
                        })}
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
                                />
                            </TableCell>
                        </TableRow>
                        <AddTask object={users} />
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default App;
