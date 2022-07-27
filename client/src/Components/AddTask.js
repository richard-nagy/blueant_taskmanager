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

const colors = ["primary", "secondary", "error", "warning", "info", "success"];

export default function AddTask({ object }) {
    const [color, setColor] = useState("primary");
    const [task, setTask] = useState("");
    const [user, setUser] = useState("-");

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
                                value={user}
                                label="User"
                                onChange={(event) => setUser(event.target.value)}
                                sx={{ height: "56px" }}
                            >
                                <MenuItem value="-">-</MenuItem>
                                {object.map((user_) => {
                                    return <MenuItem value={user_.user}>{user_.user}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button variant="contained">Add</Button>
                    </Grid>
                </Grid>
            </TableCell>
        </TableRow>
    );
}
