import { useContext, useState } from "react";
import RowMenu from "./RowMenu";
import { Avatar, Box, Checkbox, Chip, IconButton, Sheet, Typography } from "@mui/joy";
import moment from "moment";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import UsersTable from "./ManagersTable";
import { TeamContext } from "@/context/teamContext";
import UsersTableView from "./ManagersTableView";
import SubUsersTableView from "./SubUsersTableView";

export default function UserRow(props) {
    const { enableCheckbox, selected, setSelected, row } = props
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState(false);


    const {
        isCompanyUsersLoading, onAdd, onEdit, onDelete } = useContext(TeamContext);
    return (
        <tr key={row.id}>
            {enableCheckbox &&
                <td style={{ textAlign: 'center', width: 80 }}>
                    <Checkbox
                        size="sm"
                        checked={selected.includes(row.id)}
                        color={selected.includes(row.id) ? 'primary' : undefined}
                        onChange={(event) => {
                            setSelected((ids) =>
                                event.target.checked
                                    ? ids.concat(row.id)
                                    : ids.filter((itemId) => itemId !== row.id),
                            );
                        }}
                        slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                        sx={{ verticalAlign: 'text-bottom' }}
                    />
                </td>
            }
            <td>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size="sm">{row?.name?.length ? row?.name[0] : ''}</Avatar>
                    <div>
                        <Typography level="body-xs">{row?.name}</Typography>
                        {/* <Typography level="body-xs">{row?.email}</Typography> */}
                    </div>
                </Box>
            </td>
            <td>
                <Box>
                    <Typography level="body-xs">{row?.email}</Typography>
                </Box>
            </td>
            <td>
                <Chip
                    variant="soft"
                    size="sm"
                    // color={color}
                    sx={{
                        mr: 1
                    }}
                >
                    {row?.type}
                </Chip>
            </td>

            <td>
                <Typography level="body-xs">{moment(row.createdAt).format('MMM D, YYYY')}</Typography>
            </td>
            {!enableCheckbox &&
                <td>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        {/* <Link level="body-xs" component="button">
            Download
        </Link> */}
                        <RowMenu onEdit={onEdit} row={row} />
                    </Box>
                </td>
            }
        </tr>

    )
}