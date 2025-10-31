'use client'

import * as React from 'react';

import BroadcastName from './Name';
import BroadcastContacts from './Contacts';


export default function CreateBroadcast(props) {

    const { setActiveStep, activeStep, updateStep } = props;
    return (
        activeStep === 1 ?
            <BroadcastName updateStep={updateStep} />
            :
            <BroadcastContacts />
    );
}
