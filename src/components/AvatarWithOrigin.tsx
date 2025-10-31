import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Avatar, { AvatarProps } from '@mui/joy/Avatar';

type AvatarWithStatusProps = AvatarProps & {
    origin?: string;
};

export default function AvatarWithOrigin(props: AvatarWithStatusProps) {
    const { origin = 'whatsapp_business_account' } = props;
    return (
        <div>
            {/* <Badge
                // color={online ? 'success' : 'neutral'}
                // variant={online ? 'solid' : 'soft'}
                size="sm"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeInset="4px 4px"
            > */}
            <Avatar size="sm" src={origin === 'instagram' ? '/icons8-instagram.svg' : origin === 'page' ? '/icons8-messenger.svg' : '/icons8-whatsapp.svg'} />
            {/* </Badge> */}
        </div>
    );
}
