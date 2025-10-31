import * as React from 'react';
import Image from 'next/image';



export default function WBOnlyLogo(props) {
    const { onClick } = props;



    return (
        <Image
            style={{ cursor: 'pointer' }}
            onClick={onClick}
            src="/onlycommiailogo.png"
            alt="WB Logo"
            className="dark:invert"
            width={props?.width ?? 140}
            height={props?.height ?? 140}
            priority
        />
    )
} 