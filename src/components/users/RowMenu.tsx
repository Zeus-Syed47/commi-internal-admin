import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Divider, Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';


export default function RowMenu({ onEdit, row, onDelete, onAdd }) {

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
                {/* <MenuItem>Rename</MenuItem> */}
                {/* <MenuItem>Move</MenuItem> */}
                <Divider />
                {onDelete && <MenuItem onClick={() => onDelete(row)} color="danger">Delete</MenuItem>}
            </Menu>
        </Dropdown>
    )
}