// 'use client'

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Divider, Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import { useEditStore } from '@/store/editStore';
import { routes } from '@/utils/routes/localRoutes';
import { useRouter } from 'next/navigation';


export default function RowMenu({ onEdit, row, onDelete, onAdd }) {

    const { setEditing } = useEditStore()

    const router = useRouter()

    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                {onAdd && <MenuItem onClick={() => onAdd({ manager_id: row?.id, type: 'user' })} color="danger">Add User</MenuItem>}
                <MenuItem onClick={() => onEdit(row)}>Edit</MenuItem>
                {/* <MenuItem onClick={() => {
                    router.push(routes.baseprompts.create)
                    setEditing(true)
                }}>Edit</MenuItem> */}
                {/* <MenuItem>Rename</MenuItem> */}
                {/* <MenuItem>Move</MenuItem> */}
                <Divider />
                {onDelete && <MenuItem onClick={() => onDelete(row)} color="danger">Delete</MenuItem>}
            </Menu>
        </Dropdown>
    )
}