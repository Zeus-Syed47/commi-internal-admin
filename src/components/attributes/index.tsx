'use client'

import * as React from 'react';

import { useContext, useMemo } from 'react';
import { ContactContext } from '@/context/contactContext';
import AttributeSelector from './AttributesSelector';

export default function Attribute(props: any) {

    const {
        contactAttributes, attributes,
        handleAttributeChange,
        removeButtonHandler,
        addButtonHandler, selectedContactForEdit, handleUpdateContactAttribute
    } = useContext(ContactContext);

    return (
        <AttributeSelector
            contactAttributes={contactAttributes}
            attributes={attributes}
            handleAttributeChange={handleAttributeChange}
            removeButtonHandler={removeButtonHandler}
            addButtonHandler={addButtonHandler}
            selectedContactForEdit={selectedContactForEdit}
            handleUpdateContactAttribute={handleUpdateContactAttribute}
        />
    )
}