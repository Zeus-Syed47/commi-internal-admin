import * as React from 'react';
import Image from 'next/image';



export default function PortfoLogo(props){
   const {onClick} = props;
    
   
   
   return (
        <Image
                  style={{ cursor: 'pointer'}}
                  onClick={onClick}
                  src="/commiailogo.png"
                  alt="Portfo Logo"
                  className="dark:invert"
                  width={100}
                  height={24}
                  priority
                />
    )
} 