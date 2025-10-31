import * as React from 'react';
import Avatar, { AvatarProps } from '@mui/joy/Avatar';
import { Divider, Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy';
import { ArrowDownward, ArrowDropDown, ArrowDropUp, AutoFixHigh, ChevronRight } from '@mui/icons-material';
import { useRef, useState } from 'react';

type AutoCorrectMenuProps = AvatarProps & {
    open?: any;
};

export default function AutoCorrectMenu(props: AutoCorrectMenuProps) {

    const { updateSelectedOption, isCorrectedTextLoading } = props;

    const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);

    const handleSubMenuOpen = (event) => {
        setSubMenuAnchorEl(event.currentTarget);
    };

    const handleSubMenuClose = () => {
        setSubMenuAnchorEl(null);
    };

    return (
        <Dropdown onOpenChange={(event, open) => {
            console.log('onOpenChange', subMenuAnchorEl, event?.target)
            if (subMenuAnchorEl && subMenuAnchorEl?.contains(event?.target)) {
                console.log('clicked insided menu')
            }
            // if (open === false) {
            //     setSubMenuAnchorEl(null)
            // }
        }}>
            <MenuButton
                loading={isCorrectedTextLoading}
                color='neutral'
                size='sm'
                sx={{
                    borderRadius: 8,
                    ml: {
                        xs: 1,
                        md: 2
                    },
                    width: 80
                }}
                variant='outlined'
                startDecorator={<AutoFixHigh />}
                endDecorator={<ArrowDropUp />}
            >
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140, zIndex: 10000, left: 10 }}
            >
                {/* <MenuItem
                    onMouseEnter={handleSubMenuOpen}
                    onClick={(event) => {
                        handleSubMenuOpen(event);
                        event.stopPropagation();
                    }}
                >
                    Change tone
                    <ChevronRight />
                </MenuItem>
                <Menu
                    placement='right'
                    size="sm" sx={{ minWidth: 140, zIndex: 10000, ml: 6 }}
                    anchorEl={subMenuAnchorEl}
                    open={Boolean(subMenuAnchorEl)}
                    onClose={handleSubMenuClose}
                    onMouseLeave={handleSubMenuClose}
                    onClick={(event) => {
                        console.log('onClick')
                        event.stopPropagation()
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            console.log("came");
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
                </Menu> */}
                <MenuItem
                    onClick={() => updateSelectedOption('professional')}
                >Change tone to professional</MenuItem>
                <MenuItem
                    onClick={() => updateSelectedOption('friendly')}
                >Change tone to friendly</MenuItem>
                <MenuItem
                    onClick={() => updateSelectedOption('humorous')}
                >Change tone to humorous</MenuItem>
                <MenuItem
                    onClick={() => updateSelectedOption('shorten')}
                >Make it shorter</MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => updateSelectedOption('lengthen')}
                >Make it longer</MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => updateSelectedOption('correct')}
                >Correct</MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => updateSelectedOption('simplify')}
                >Simplify</MenuItem>
            </Menu>
        </Dropdown >
    );
}
