import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Avatar, { AvatarProps } from '@mui/joy/Avatar';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import { SmartToy, SmartToyOutlined, SmartToyTwoTone } from '@mui/icons-material';

type AvatarWithStatusProps = AvatarProps & {
    online?: boolean;
};

export default function BotWithStatus(props: AvatarWithStatusProps) {
    const { online = false, ...other } = props;
    return (
        <div>
            <SmartToyOutlined sx={{ height: 30, width: 30 }} />
        </div>
    );
}
