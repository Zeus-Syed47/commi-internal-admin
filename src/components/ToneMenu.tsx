import { Divider, Dropdown, Menu, MenuItem } from "@mui/joy";

const ToneMenu = (props) => {
    const { submenuOpen, updateSelectedOption } = props;
    return (
        <Menu size="sm" sx={{ minWidth: 140, zIndex: 10000, ml: 6 }}

        >
            <MenuItem
                onClick={() => {
                    console.log('test')
                    updateSelectedOption('professional')
                }}
            >Professional</MenuItem>
            <Divider />
            <MenuItem
                onClick={() => updateSelectedOption('friendly')}
            >Friendly</MenuItem>
            <Divider />
            <MenuItem
                onClick={() => updateSelectedOption('humorous')}
            >Humorous</MenuItem>
        </Menu>
    )
}

export default ToneMenu;