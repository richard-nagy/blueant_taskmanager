import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TableCell,
    TableRow,
    TextField,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";
import axios from "axios";

const colors = ["primary", "secondary", "error", "warning", "info", "success"];

export default function AddTask({ object }) {
    const [color, setColor] = useState("primary");
    const [task, setTask] = useState("");
    const [user, setUser] = useState(null);

    function AddTask() {
        if (task !== "") {
            const userid = user === "" ? null : user;

            axios
                .post("http://localhost:3001/addTask", { task, color, userid })
                .then(() => {
                    console.log("succes");
                })
                .catch(function () {
                    alert("Error");
                });
        }
    }

    return (
        <TableRow>
            <TableCell colSpan={3} justify="center">
                <Grid container direction="row" spacing={2} alignItems="center">
                    <Grid item>
                        <FormControl sx={{ width: 200 }}>
                            <InputLabel id="color">Color</InputLabel>
                            <Select
                                labelId="color"
                                id="color"
                                value={color}
                                label="Color"
                                onChange={(event) => setColor(event.target.value)}
                                sx={{ height: "56px" }}
                            >
                                {colors.map((mapColor) => {
                                    return (
                                        <MenuItem
                                            key={mapColor}
                                            value={mapColor}
                                            sx={{ display: "flex", alignItems: "center" }}
                                        >
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item>
                                                    <CircleIcon
                                                        color={mapColor}
                                                        sx={{
                                                            margin: "5px 5px 0 0",
                                                            fontSize: "16px",
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    {mapColor.charAt(0).toUpperCase() +
                                                        mapColor.slice(1)}
                                                </Grid>
                                            </Grid>
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Task"
                            onChange={(event) => {
                                setTask(event.target.value);
                            }}
                            value={task}
                            sx={{ width: 200 }}
                        />
                    </Grid>
                    <Grid item>
                        <FormControl sx={{ width: 200 }}>
                            <InputLabel id="user">User</InputLabel>
                            <Select
                                labelId="user"
                                id="user"
                                value={user === null ? "" : user}
                                label="User"
                                onChange={(event) => setUser(event.target.value)}
                                sx={{ height: "56px" }}
                            >
                                <MenuItem value={null}>
                                    <i style={{ color: "gray" }}>No user</i>
                                </MenuItem>
                                {object.map((mapUser) => {
                                    return (
                                        <MenuItem value={mapUser.user} key={Math.random()}>
                                            {mapUser.user}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={() => {
                                AddTask();
                            }}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </TableCell>
        </TableRow>
    );
}
