"use client"

import { createContact, deleteContact, getContact, getContactAttributes, importContacts, syncContacts, updateContact, updateContactAttribute } from "@/api/contacts";
import useStore from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react"
import _ from 'lodash';
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes/localRoutes";
import { countries } from "@/utils/country";
import { removeCountryCode } from "@/utils/format/phoneNumber";
import { getCompanyAttributes } from "@/api/attributes";
import { useTheme } from "@mui/joy";
import useMediaQuery from "@mui/material/useMediaQuery";

const defaultContactValues = {
    name: "",
    country_code: {
        name: "United Arab Emirates",
        dial_code: "+971",
        code: "AE",
    },
    phone_number: null,
    attributes: [],
    company_name: ""
}

function useContact() {
    const router = useRouter();

    const pipelineStatus = [{
        id: 'qualified',
        label: 'Qualified',
    },
    {
        id: 'contact_made',
        label: 'Contact Made',
    },
    {
        id: 'demo_scheduled',
        label: 'Demo Scheduled',
    },
    {
        id: 'proposal_made',
        label: 'Proposal made',
    },
    {
        id: 'deal_won',
        label: 'Deal won',
    },
    {
        id: 'deal_lost',
        label: 'Deal lost',
    }
    ]

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    const [contactValues, setContactValues] = useState(
        defaultContactValues
    );

    const [contactAttributes, setContactAttributes] = useState(
        []
    );

    const [isContactsSyncing, setIsContactsSyncing] = useState(false);
    const [syncedContacts, setSyncedContacts] = useState([])

    const currentUser = useStore((state) => state?.currentUser);

    const selectedContactForEdit = useStore((state) => state?.selectedContactForEdit);
    const updateSelectedContactForEdit = useStore((state) => state?.updateSelectedContactForEdit);



    const { data: contact, isLoading, refetch } = useQuery({
        queryKey: ["contacts", selectedContactForEdit?.id],
        queryFn: () => {
            return getContact({
                contact_id: selectedContactForEdit.id
            })
        },
        enabled: !!selectedContactForEdit.id
    });

    const { data: contactAttributesData, isLoading: isContactAttributesDataLoading, refetch: refetchContactAttributes } = useQuery({
        queryKey: ["getContactAttributes", selectedContactForEdit?.id],
        queryFn: () => {
            return getContactAttributes({
                contact_id: selectedContactForEdit.id
            })
        },
        enabled: !!selectedContactForEdit.id
    });

    const { isPending: isAttributesLoading, data: attributes, } = useQuery({
        queryKey: ['getCompanyAttributes'],
        queryFn: () => {
            return getCompanyAttributes({
                company_id: currentUser?.company_id
            })
        },
    })

    useEffect(() => {
        if (Object.keys(contact?.data ?? {})?.length > 0) {

            let contactValues: any = {};

            if (contact?.data?.name) {
                contactValues.name = contact?.data?.name;
            }

            if (contact?.data?.phone_number) {
                contactValues.phone_number = removeCountryCode(contact?.data?.phone_number, contact?.data?.country_code);
            }

            if (contact?.data?.country_code) {
                contactValues.country_code = countries?.filter(itm => itm?.dial_code === contact?.data?.country_code).pop();
            }

            if (contact?.data?.pipeline_status) {
                contactValues.pipeline_status = pipelineStatus?.find(itm => itm?.id === contact?.data?.pipeline_status);
            }

            if (contact?.data?.company_name) {
                contactValues.company_name = contact?.data?.company_name;
            }

            // if (contact?.data?.attributes) {
            //     contactValues.attributes = contact?.data?.attributes;
            // }

            setContactValues(contactValues);
        }
    }, [contact, countries, setContactValues]);

    useEffect(() => {
        if (Object.keys(contactAttributesData?.data ?? {})?.length > 0) {
            setContactAttributes(contactAttributesData?.data);
        }
    }, [contactAttributesData?.data])

    const { mutate: createContactApi, isPending: isContactCreating } =
        useMutation({
            mutationKey: ["sendBroadcast"],
            mutationFn: createContact,
            onSuccess(data, variables, context) {
                if (data) {
                    setContactValues(defaultContactValues);
                    refetch();
                    router.push(routes.contacts.home)
                }
            },
        });

    const { mutate: updateContactApi, isPending: isContactUpdating } =
        useMutation({
            mutationKey: ["updateContact"],
            mutationFn: updateContact,
            onSuccess(data, variables, context) {
                if (data) {
                    setContactValues(defaultContactValues);
                    updateSelectedContactForEdit({})
                    refetch();
                    router.push(routes.contacts.home)
                }
            },
        });

    const { mutate: updateContactAttributeApi, isPending: isContactAttributeUpdating } =
        useMutation({
            mutationKey: ["updateContact"],
            mutationFn: updateContactAttribute,
            onSuccess(data, variables, context) {
                if (data) {
                    refetchContactAttributes();
                    router.push(routes.contacts.home)
                }
            },
        });


    const { mutate: importContactsApi, isPending: isImporting } =
        useMutation({
            mutationKey: ["importContacts"],
            mutationFn: importContacts,
            onSuccess(data, variables, context) {
                if (data) {
                    refetch();
                }
            },
        });


    const { mutate: syncContactsApi, isPending: isSyncing } =
        useMutation({
            mutationKey: ["syncContacts"],
            mutationFn: syncContacts,
            onSuccess(data, variables, context) {
                if (data) {
                    router.back();
                }
            },
        });

    const updateContactFields = useCallback((data: any) => {
        setContactValues(prev => ({
            ...prev,
            [data.key]: data.value
        }))
    }, [setContactValues]);

    const resetContactFields = useCallback(() => {
        setContactValues(defaultContactValues)

    }, [setContactValues]);

    const handleCreateContact = useCallback(() => {

        if (!contactValues.country_code) {
            // setError('Please select a template')
            return;
        }
        if (!contactValues.name) {
            // setError('Please enter a name')
            return;
        }
        if (!contactValues?.phone_number) {
            // setError('Please enter a name')
            return;
        }


        let tempObj: any = {
            name: contactValues.name,
            country_code: contactValues.country_code.dial_code,
            phone_number: contactValues.country_code.dial_code?.slice(1) + contactValues.phone_number,
            company_id: currentUser?.company_id,
            waba_meta_id: currentUser?.company?.wabas[0]?.waba_meta_id,
            phone_number_id: currentUser?.company?.wabas[0]?.businessnumbers[0]?.business_phone_id, // TODO: add phone number selection dropdown for ADMIN and NON-ADMIN currentUser?.assigned_phone_number_id || currentUser?.manager?.assigned_phone_number_id condition
            company_name: contactValues?.company_name ?? ''
        };

        if (contactValues?.pipeline_status) {
            tempObj.pipeline_status = contactValues?.pipeline_status?.id
        }

        if (contactAttributes?.length > 0) {
            tempObj.attributes = contactAttributes?.map((att: any) => {
                return {
                    name: att?.name,
                    attribute_id: att?.attribute_id,
                    value: att?.value,
                }
            })
        }

        if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
            createContactApi(tempObj)
        }

    }, [createContactApi, contactValues, currentUser, contactAttributes]);

    const handleUpdateContactPersonalInfo = useCallback(() => {

        let tempObj: any = {};

        if (contactValues?.country_code) {
            tempObj.country_code = contactValues?.country_code?.dial_code
        }
        if (contactValues?.name) {
            tempObj.name = contactValues.name
        }
        if (contactValues?.phone_number) {
            tempObj.phone_number = contactValues?.country_code?.dial_code?.slice(1) + contactValues?.phone_number
        }

        if (contactValues?.pipeline_status) {
            tempObj.pipeline_status = contactValues?.pipeline_status?.id
        }

        if (contactValues?.company_name) {
            tempObj.company_name = contactValues?.company_name
        }

        if (Object.keys(tempObj).length <= 0) {
            return
        }

        updateContactApi({ data: tempObj, contact_id: selectedContactForEdit?.id })


    }, [updateContactApi, contactValues, selectedContactForEdit]);


    const handleUpdateContactAttribute = useCallback(() => {

        if (!contactAttributes) {
            // setError('Please select a template')
            return;
        }
        let newAttributes = [];
        let updateAttributes = [];
        let deleteAttributes = [];



        for (let att of contactAttributes) {
            let staticValues = {
                name: att?.name,
                id: att?.id,
                attribute_id: att?.attribute_id,
                value: att?.value,
                contact_id: att?.contact_id
            }
            if (att?._update) {
                updateAttributes.push({
                    ...staticValues,
                    _update: att?._update,
                })
            }
            if (att?._destroy) {
                deleteAttributes.push({
                    ...staticValues,
                    _destroy: att?._destroy,
                })
            }
            if (att?._new) {
                newAttributes.push({
                    ...staticValues,
                    _new: att?._new,
                })
            }
        }


        updateContactAttributeApi({
            data: {
                updateAttributes,
                deleteAttributes,
                newAttributes,
            }
        })


    }, [updateContactAttributeApi, contactAttributes, selectedContactForEdit]);


    const handleAttributeUpdate = useCallback(() => {
        if (!contactAttributes?.length) {
            // setError('Please select a template')
            return;
        }


    }, [contactAttributes]);


    const handleAttributeChange = useCallback((index, value, key) => {

        const tempAttributes = [...contactAttributes]

        let exampleValue: any = tempAttributes[index]

        if (key === 'value') {
            exampleValue[key] = value
            if (!exampleValue?._new) {
                exampleValue = {
                    ...exampleValue,
                    _update: true
                }
            }
        }
        else {
            exampleValue = {
                ...exampleValue,
                ...value,
                _update: exampleValue?._new ? false : true
            }
        }

        tempAttributes[index] = exampleValue

        setContactAttributes(tempAttributes)

    }, [contactAttributes, setContactAttributes])

    const removeButtonHandler = useCallback((index) => {
        const tempAttributes = [...contactAttributes]

        let exampleValue: any = tempAttributes[index]

        if (exampleValue?._new) {
            tempAttributes.splice(index, 1);
        }
        else if (exampleValue?._destroy) {
            exampleValue = {
                ...exampleValue,
                _destroy: false,
            }
            tempAttributes[index] = exampleValue
        }
        else {
            exampleValue = {
                ...exampleValue,
                _destroy: true,
            }
            tempAttributes[index] = exampleValue
        }

        setContactAttributes(tempAttributes)

    }, [setContactAttributes, contactAttributes])

    const addButtonHandler = useCallback(() => {
        const tempAttributes: any = [...contactAttributes]

        let attrData = attributes?.data?.length ? { name: attributes?.data[0]?.name, attribute_id: attributes?.data[0]?.id } : {};
        tempAttributes.push({
            ...attrData,
            contact_id: selectedContactForEdit?.id,
            _new: true,
            value: '',
        })

        setContactAttributes(tempAttributes)

    }, [setContactAttributes, attributes?.data, contactAttributes, selectedContactForEdit?.id])

    const sendSyncContactSignalToMobileApp = useCallback(() => {
        window?.ReactNativeWebView?.postMessage("syncContactSignal");
    }, []);

    const updateItemCheck = useCallback((contact) => {
        setSyncedContacts((prevItems) =>
            prevItems.map((item) =>
                item.id === contact?.id ? { ...item, checked: !contact.checked } : item
            )
        );
    }, [syncedContacts])

    const handleSyncContact = useCallback(() => {

        if (!syncedContacts?.length) {
            // setError('Please select a template')
            return;
        }


        let tempObj: any = {
            contacts: syncedContacts,
            company_id: currentUser?.company_id,
            waba_meta_id: currentUser?.company?.wabas[0]?.waba_meta_id,
            phone_number_id: currentUser?.company?.wabas[0]?.businessnumbers[0]?.business_phone_id // TODO: add phone number selection dropdown for ADMIN and NON-ADMIN currentUser?.assigned_phone_number_id || currentUser?.manager?.assigned_phone_number_id condition
        };

        if (contactAttributes?.length > 0) {
            tempObj.attributes = contactAttributes?.map((att: any) => {
                return {
                    name: att?.name,
                    attribute_id: att?.attribute_id,
                    value: att?.value,
                }
            })
        }

        syncContactsApi(tempObj)

    }, [syncContactsApi, syncedContacts, currentUser, contactAttributes]);


    return {
        contact: contact?.data,
        isLoading,
        selectedContactForEdit,
        updateContactFields,
        resetContactFields,
        handleCreateContact,
        contactValues,
        importContactsApi,
        attributes: attributes?.data ?? [],
        handleAttributeChange,
        removeButtonHandler,
        addButtonHandler,
        handleAttributeUpdate,
        updateSelectedContactForEdit,
        handleUpdateContactAttribute,
        handleUpdateContactPersonalInfo,
        contactAttributes,
        isMobile, sendSyncContactSignalToMobileApp,
        isContactsSyncing, setIsContactsSyncing,
        updateItemCheck, syncedContacts, setSyncedContacts,
        handleSyncContact, isSyncing, pipelineStatus
    }

}


export default useContact