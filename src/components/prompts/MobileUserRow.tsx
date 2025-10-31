import { Avatar, Box, IconButton, List, ListDivider, ListItem, ListItemContent, ListItemDecorator, Typography } from "@mui/joy";
import RowMenu from "./RowMenu";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from "moment";
import { useState } from "react";


export default function MobileUserRow(props: any) {
    const { listItem, enableCheckbox, currentUser, onEdit, onAdd } = props;
    const [open, setOpen] = useState(false);
    return (
        <>
            <List key={listItem.id} size="sm" sx={{ '--ListItem-paddingX': 0 }}>
                <ListItem
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                    }}
                >
                    <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                        <ListItemDecorator>
                            <Avatar size="sm">{listItem?.name?.length ? listItem.name[0] : ''}</Avatar>
                        </ListItemDecorator>
                        <div>
                            <Typography gutterBottom sx={{ fontWeight: 600 }}>
                                {listItem.name}
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',


                            }}>
                                {/* <Typography level="body-xs" gutterBottom>
                                    {listItem.email}
                                </Typography>
                                <Typography level="body-xs" sx={{ mx: 1 }}>&bull;</Typography> */}
                                <Typography level="body-xs">{moment(listItem.createdAt).format('MMM D, YYYY')}</Typography>

                            </Box>


                        </div>
                    </ListItemContent>
                    {!enableCheckbox &&
                        <RowMenu onEdit={onEdit} onAdd={currentUser?.type === 'admin' && onAdd} row={listItem} />
                    }
                </ListItem>
                {currentUser?.type !== 'admin' &&
                    <ListDivider />
                }
            </List>
            {currentUser?.type === 'admin' &&
                <>
                    <List key={listItem.id} size="sm" sx={{ '--ListItem-paddingX': 0, mt: -1.5 }}>
                        <ListItem
                            sx={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <ListItemContent sx={{ flex: 1, display: 'flex', gap: 2, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <ListItemDecorator>
                                    <IconButton
                                        aria-label="expand row"
                                        variant="plain"
                                        color="neutral"
                                        size="sm"
                                        onClick={() => setOpen(!open)}
                                    >
                                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </ListItemDecorator>


                                {currentUser?.type === 'admin' &&



                                    <Typography level='body-sm'>Team members: <Typography sx={{
                                        fontWeight: 'bold',
                                        fontSize: 16
                                    }}> {listItem?.teamMembers?.length ?? 0}</Typography> </Typography>



                                }

                            </ListItemContent>

                        </ListItem>
                        {!open &&
                            <ListDivider />
                        }
                    </List>
                    {
                        open && listItem?.teamMembers?.map((member, index) => {
                            return <List key={listItem.id} size="sm" sx={{ '--ListItem-paddingX': 0 }}>
                                <ListItem
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'start',
                                        backgroundColor: 'var(--variant-softBg, var(--joy-palette-neutral-softBg, var(--joy-palette-neutral-100, #F0F4F8)))'
                                    }}
                                >
                                    <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                                        <ListItemDecorator>
                                            <Avatar size="sm">{member?.name?.length ? member.name[0] : ''}</Avatar>
                                        </ListItemDecorator>
                                        <div>
                                            <Typography gutterBottom sx={{ fontWeight: 600 }}>
                                                {member.name}
                                            </Typography>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'row',


                                            }}>
                                                <Typography level="body-xs" gutterBottom>
                                                    {member.email}
                                                </Typography>
                                                <Typography level="body-xs" sx={{ mx: 1 }}>&bull;</Typography>
                                                <Typography level="body-xs">{moment(member.createdAt).format('MMM D, YYYY')}</Typography>

                                            </Box>


                                        </div>
                                    </ListItemContent>
                                    {!enableCheckbox &&
                                        <RowMenu onEdit={onEdit} row={member} />
                                    }
                                </ListItem>
                                {index == listItem?.teamMembers?.length - 1 &&
                                    <ListDivider />
                                }
                            </List>
                        })
                    }
                </>
            }


        </>
    )
}