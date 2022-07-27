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

function App() {
    const [tasks, setTasks] = useState();

    useEffect(() => {
        axios.get("http://localhost:3001/getTasks").then((res) => {
            setTasks(res.data);
            console.log(res.data);
        });
    }, []);

    return (
        <Container>
            <TableContainer>
                <Table>
                    <TableBody>
                        {!tasks
                            ? "Loading..."
                            : tasks.map((object) => {
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
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default App;
