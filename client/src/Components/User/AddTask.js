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
import styled from "@emotion/styled";
import axiosApi from "../../apis/AxiosApi";

const HighButton = styled(Button)(() => ({
    width: "80px",
    fontWeight: "bold",
}));

const colors = ["primary", "secondary", "error", "warning", "info", "success"];

export default function AddTask({
    users,
    close,
    refreshTasks,
    startingValues = { task: "", color: "primary", iduser: null },
    addNew = false,
    changeTask = undefined,
}) {
    const [color, setColor] = useState(startingValues.color);
    const [task, setTask] = useState(startingValues.task);
    const [user, setUser] = useState(startingValues.iduser);

    function AddTask() {
        if (task !== "") {
            const userid = user === "" ? null : user;

            axiosApi(
                "post",
                "task/add",
                { task, color, userid },
                () => {
                    close();
                    refreshTasks();
                },
                () => {
                    alert("Error");
                }
            );
        }
    }

    return (
        <TableRow>
            <TableCell colSpan={4} justify="center">
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
                                {users.map((mapUser) => {
                                    return (
                                        <MenuItem value={mapUser.iduser} key={Math.random()}>
                                            {mapUser.user}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{ width: "216px" }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={3}
                        >
                            <Grid item>
                                <HighButton
                                    variant="outlined"
                                    onClick={() => {
                                        addNew
                                            ? AddTask()
                                            : changeTask({
                                                  ...startingValues,
                                                  color: color,
                                                  task: task,
                                                  iduser: user,
                                              });
                                    }}
                                >
                                    Save
                                </HighButton>
                            </Grid>
                            <Grid item>
                                <HighButton
                                    color="error"
                                    variant="outlined"
                                    onClick={() => {
                                        close();
                                    }}
                                >
                                    Close
                                </HighButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </TableCell>
        </TableRow>
    );
}
