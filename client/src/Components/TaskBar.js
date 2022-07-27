import { Checkbox, TableCell, TableRow } from "@mui/material";
import CircleCheckedFilled from "@mui/icons-material/CheckCircle";
import CircleUnchecked from "@mui/icons-material/CircleOutlined";
import { useState } from "react";

export default function TaskBar({ object }) {
    const [checked, setChecked] = useState(object.done === 0 ? false : true);

    return (
        <TableRow>
            <TableCell sx={{ width: "1px", whiteSpace: "nowrap", paddingRight: "0" }}>
                <Checkbox
                    icon={<CircleUnchecked />}
                    checkedIcon={<CircleCheckedFilled />}
                    size="small"
                    color={object.color}
                    checked={checked}
                    sx={{
                        color: `${object.color}.main`,
                    }}
                    onChange={() => {
                        setChecked(!checked);
                    }}
                />
            </TableCell>
            <TableCell sx={{ paddingLeft: "0" }}>{object.task}</TableCell>
            <TableCell align="right">{object.iduser ? object.iduser : "-"}</TableCell>
        </TableRow>
    );
}
