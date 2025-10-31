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

export default function SubUsersRow(props) {
    const { enableCheckbox, selected, setSelected, row, onEdit, onDelete } = props
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState(false);


    const { companyUsers,
        isCompanyUsersLoading, currentPage, setCurrentPage, totalRows } = useContext(TeamContext);
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
                {/* <td style={{}}>
                    <IconButton
                        aria-label="expand row"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </td> */}
                <td style={{
                    width: '5%'
                }}></td>
                <td style={{
                    width: '20%'
                }}></td>
                <td style={{
                    width: '70%'
                }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar size="sm">{row?.name?.length ? row?.name[0] : ''}</Avatar>
                        <div>
                            <Typography level="body-xs">{row?.name}</Typography>
                            <Typography level="body-xs">{row?.email}</Typography>
                        </div>
                    </Box>
                </td>

                {/* <td>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Typography level="body-xs">{row?.email}</Typography>
                    </Box>
                </td> */}


                {/* <td>
                    <Chip
                        variant="soft"
                        size="sm"
                        color={'success'}
                        sx={{
                            mr: 1
                        }}
                    >
                        {`${row?.type}`}
                    </Chip>

                </td> */}

                {/* <td>
                    <Typography level="body-xs">{moment(row.createdAt).format('MMM D, YYYY')}</Typography>
                </td> */}
                {!enableCheckbox &&
                    <td style={{
                        width: '5%'
                    }}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            {/* <Link level="body-xs" component="button">
            Download
        </Link> */}
                            <RowMenu onEdit={onEdit} onDelete={onDelete} row={row} />
                        </Box>
                    </td>
                }
            </tr>
            {/* <tr style={{
            }}>
                {open &&
                    <td style={{ height: 0, padding: 0 }} colSpan={6}>
                        <Sheet
                            variant='soft'
                            color='primary'
                            invertedColors
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
                                rows={companyUsers}
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
            </tr> */}
        </>
    )
}