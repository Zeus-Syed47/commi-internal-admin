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

export default function ManagerRow(props) {
    const { enableCheckbox, selected, setSelected, row } = props
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState(false);


    const {
        isCompanyUsersLoading, onAdd, onEdit, onDelete } = useContext(TeamContext);
    return (
        <>
            <tr key={row.id}>
                {/* {enableCheckbox &&
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
                } */}
                <td>
                    <IconButton
                        aria-label="expand row"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </td>
                <td>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar size="sm">{row?.name?.length ? row?.name[0] : ''}</Avatar>
                        <div>
                            <Typography level="body-xs">{row?.name}</Typography>
                            <Typography level="body-xs">{row?.email}</Typography>
                        </div>
                        <Typography level='title-md'>{`(${row?.teamMembers?.length})`}</Typography>
                    </Box>
                </td>
                <td>
                    <Box></Box>
                </td>

                {!enableCheckbox &&
                    <td>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            {/* <Link level="body-xs" component="button">
            Download
        </Link> */}
                            <RowMenu onEdit={onEdit} row={row} onAdd={onAdd} />
                        </Box>
                    </td>
                }
            </tr>
            <tr style={{
            }}>
                {open &&
                    <td style={{ height: 0, padding: 0 }} colSpan={6}>
                        <Sheet
                            // variant='soft'
                            // color='primary'
                            // invertedColors
                            // className="OrderTableContainer"
                            sx={{
                                display: { xs: 'none', sm: 'initial' },
                                width: '100%',
                                borderRadius: 'sm',
                                flexShrink: 1,
                                overflow: 'auto',
                                minHeight: 0 //'70vh'
                            }}
                        >
                            <SubUsersTableView
                                enableCheckbox={enableCheckbox}
                                selected={selected}
                                setSelected={setSelected}
                                isLoading={isCompanyUsersLoading}
                                rows={row?.teamMembers ?? []}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                order={order}
                                variant={'solid'}
                                color={'primary'}
                                invertedColors={true}
                            />
                        </Sheet>
                    </td>
                }
            </tr>
        </>
    )
}