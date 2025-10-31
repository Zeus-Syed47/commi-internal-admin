import * as React from 'react';
import Image from 'next/image';



export default function NewWBlogo(props) {
    const { onClick } = props;



    return (
        <Image
            style={{ cursor: 'pointer' }}
            onClick={onClick}
            src="/commiailogo.png"
            alt="WB Logo"
            className="dark:invert"
            width={props?.width ?? 70}
            height={props?.height ?? 70}
            priority
        />
    )
} 