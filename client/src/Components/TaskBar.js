import { Checkbox, Radio, TableCell, TableRow } from "@mui/material";
import CircleCheckedFilled from "@mui/icons-material/CheckCircle";
import CircleUnchecked from "@mui/icons-material/CircleOutlined";

export default function TaskBar({ object }) {
    return (
        <TableRow>
            <TableCell sx={{ width: "1px", whiteSpace: "nowrap", paddingRight: "0" }}>
                <Checkbox
                    icon={<CircleUnchecked />}
                    checkedIcon={<CircleCheckedFilled />}
                    size="small"
                    color={object.color}
                    sx={{
                        color: `${object.color}.main`,
                    }}
                />
            </TableCell>
            <TableCell sx={{ paddingLeft: "0" }}>{object.task}</TableCell>
            <TableCell align="right">{object.idusers ? object.idusers : "-"}</TableCell>
        </TableRow>
    );
}
