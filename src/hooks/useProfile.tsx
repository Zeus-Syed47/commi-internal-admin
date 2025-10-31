"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store";
import { findUser, findUsersOfCompany, removeUserFromACompany, updateUserOfACompany } from "@/api/users";
import { getCompany, updateCompany } from "@/api/company";
import { toast } from "react-toastify";
import { getLocaleString } from "@/utils/getLocale";
import { removeCountryCode } from "@/utils/format/phoneNumber";
import { countries } from "@/utils/country";
import { routes } from "@/utils/routes/localRoutes";
import { createVirtualPhoneNumberAPI, getVirtualPhoneNumbers, updateVirtualPhoneNumberAPI } from "@/api/virtualPhoneNumbers";

function useProfile() {

    const defaultCountryCode = {
        name: "United Arab Emirates",
        dial_code: "+971",
        code: "AE",
    };
    const [userValues, setUserValues] = useState({
        country_code: defaultCountryCode,
    });
    const [companyValues, setCompanyValues] = useState({});
    const [virtual_phone_numbers_info, setVirtualPhoneNumbersInfo] = useState({});
    const [openDelete, setOpenDelete] = useState(false);
    const router = useRouter();

    const currentUser = useStore((state) => state?.currentUser);
    const reset = useStore((state) => state?.reset);

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['findUser'],
        queryFn: () => {
            return findUser({
                user_id: currentUser?.id,
            })
        },
        enabled: !!currentUser?.id,
    })

    const { isLoading: isCompanyLoading, data: company, refetch: refetchCompany } = useQuery({
        queryKey: ['company'],
        queryFn: () => {
            return getCompany({
                company_id: currentUser?.company_id,
            })
        },
        enabled: !!currentUser?.id,
    })

    const { data: aiEmployees, isLoading: isCompanyUsersLoading, refetch: refetchAI } = useQuery({
        queryKey: ["companyUsers"],
        queryFn: () => {
            return findUsersOfCompany({
                company_id: currentUser?.company_id,
                forAI: true
            });
        },
        enabled: true,
    });

    const { isLoading: isVirtualPhoneNumbersLoading, data: virtual_phone_numbers, refetch: refetchVirtual } = useQuery({
        queryKey: ['phone_numbers'],
        queryFn: () => {
            return getVirtualPhoneNumbers({
                company_id: currentUser?.company_id,
            })
        },
        enabled: true, // TODO only for admin
    })

    useMemo(() => {
        if (virtual_phone_numbers?.data?.rows?.length > 0) {
            let infoObj: any = {}
            infoObj.id = virtual_phone_numbers?.data?.rows[0]?.id
            infoObj.phone_number = virtual_phone_numbers?.data?.rows[0]?.phone_number
            infoObj.incoming_attender_id = virtual_phone_numbers?.data?.rows[0]?.incoming_attender_id
            infoObj.outgoing_caller_id = virtual_phone_numbers?.data?.rows[0]?.outgoing_caller_id
            setVirtualPhoneNumbersInfo(infoObj)
        }
    }, [virtual_phone_numbers?.data, setVirtualPhoneNumbersInfo])

    useEffect(() => {
        if (Object.keys(company?.data ?? {})?.length > 0) {
            let companyValuesObj: any = {}
            if (company?.data?.name) {
                companyValuesObj.name = company?.data?.name
            }
            setCompanyValues(companyValuesObj)
        }
    }, [setCompanyValues, company?.data])

    useEffect(() => {
        if (Object.keys(data?.data ?? {})?.length > 0) {
            let userValuesObj: any = {}
            if (data?.data?.name) {
                userValuesObj.name = data?.data?.name
            }
            if (data?.data?.role) {
                userValuesObj.role = data?.data?.role
            }
            if (data?.data?.email) {
                userValuesObj.email = data?.data?.email
            }

            if (data?.data?.phone_number) {
                userValuesObj.phone_number = removeCountryCode(data?.data?.phone_number, data?.data?.country_code);
            }

            if (data?.data?.country_code) {
                userValuesObj.country_code = countries?.filter(itm => itm?.dial_code === data?.data?.country_code).pop();
            }
            else {
                userValuesObj.country_code = defaultCountryCode
            }

            setUserValues(userValuesObj)
        }
    }, [setUserValues, data?.data, countries])


    const { mutate: updateUser, isPending: isUserUpdating } =
        useMutation({
            mutationKey: ["updateUserOfACompany"],
            mutationFn: updateUserOfACompany,
            onSuccess(data, variables, context) {
                if (data?.data) {
                    toast.success(getLocaleString('userUpdate'))
                    refetch()
                }
            },
        });

    const { mutate: updateCompanyHandler, isPending: isCompanyUpdating } =
        useMutation({
            mutationKey: ["updateUserOfACompany"],
            mutationFn: updateCompany,
            onSuccess(data, variables, context) {
                if (data?.data) {
                    toast.success(getLocaleString('companyUpdate'))
                    refetchCompany()
                }
            },
        });


    const { mutate: deleteAccountHandler, isPending: isCompanyDeleting } =
        useMutation({
            mutationKey: ["removeUserFromACompany"],
            mutationFn: removeUserFromACompany,
            onSuccess(data, variables, context) {
                if (data?.data) {
                    toast.success(getLocaleString('accountDelete'))
                    setOpenDelete(false)
                    reset()
                    window?.ReactNativeWebView?.postMessage('initializeInitialData');
                    router.push(routes.login.home)
                }
            },
        });

    const { mutate: createVirtualPhoneNumber, isPending: isCreatingVirtualPhoneNumber } =
        useMutation({
            mutationKey: ["createVirtualPhoneNumber"],
            mutationFn: createVirtualPhoneNumberAPI,
            onSuccess(data, variables, context) {
                if (data?.data) {
                    toast.success(getLocaleString('virtualPhoneNumberCreate'));
                    refetchVirtual();
                }
            },
        });

    const { mutate: updateVirtualPhoneNumber, isPending: isUpdatingVirtualPhoneNumber } =
        useMutation({
            mutationKey: ["updateVirtualPhoneNumber"],
            mutationFn: updateVirtualPhoneNumberAPI,
            onSuccess(data, variables, context) {
                if (data?.data) {
                    toast.success(getLocaleString('virtualPhoneNumberUpdate'));
                    refetchCompany();
                }
            },
        });

    const { mutate: deleteVirtualPhoneNumber, isPending: isDeletingVirtualPhoneNumber } =
        useMutation({
            mutationKey: ["deleteVirtualPhoneNumber"],
            mutationFn: (data) => removeUserFromACompany({ ...data, company_id: currentUser?.company_id }),
            onSuccess(data, variables, context) {
                if (data?.data) {
                    toast.success(getLocaleString('virtualPhoneNumberDelete'));
                    refetchCompany();
                }
            },
        });

    const handleUserInfoUpdate = useCallback(() => {
        let updateObj: any = {}
        if (userValues?.name) {
            updateObj.name = userValues.name
        }
        if (userValues?.password) {
            updateObj.password = userValues.password
        }
        // if (userValues?.email) {
        //     updateObj.email = userValues.email
        // }
        if (userValues?.role) {
            updateObj.role = userValues.role
        }

        if (userValues?.phone_number) {
            updateObj.country_code = userValues?.country_code?.dial_code;
            updateObj.phone_number = userValues?.country_code?.dial_code?.slice(1) + userValues?.phone_number;
        }

        if (userValues?.confirmPassword && userValues?.password) {
            if (userValues?.password !== userValues?.confirmPassword) {
                toast.error(getLocaleString('passwordMismatch'))
                return
            }
            updateObj.password = userValues?.password
        }
        updateUser({
            data: updateObj,
            user_id: currentUser?.id
        })
    }, [userValues, currentUser?.id, updateUser]);

    const handleCompanyInfoUpdate = useCallback(() => {
        let updateObj: any = {}
        if (companyValues?.name) {
            updateObj.name = companyValues.name
        }
        updateCompanyHandler({
            data: updateObj,
            company_id: currentUser?.company_id
        })
    }, [companyValues, currentUser?.company_id, updateCompanyHandler]);

    const updateUserFields = useCallback((data: any) => {
        setUserValues(prev => ({
            ...prev,
            [data.key]: data.value
        }))
    }, [setUserValues]);

    const updateCompanyFields = useCallback((data: any) => {
        setCompanyValues(prev => ({
            ...prev,
            [data.key]: data.value
        }))
    }, [setCompanyValues]);

    const goBack = useCallback(() => {
        router.back();
    }, [router]);

    const handleDeleteAccount = useCallback(() => {
        deleteAccountHandler({
            user_id: currentUser?.id,
            company_id: currentUser?.company_id
        });
    }, [deleteAccountHandler, currentUser?.id]);

    const handleVirtualPhoneNumber = useCallback(() => {
        if (virtual_phone_numbers_info?.phone_number) {
            let updatedInfoObj: any = {}
            updatedInfoObj.phone_number = virtual_phone_numbers_info?.phone_number
            if (virtual_phone_numbers_info?.incoming_attender_id) {
                updatedInfoObj.incoming_attender_id = virtual_phone_numbers_info?.incoming_attender_id
            }
            if (virtual_phone_numbers_info?.outgoing_caller_id) {
                updatedInfoObj.outgoing_caller_id = virtual_phone_numbers_info?.outgoing_caller_id
            }
            if (virtual_phone_numbers?.data?.rows?.length > 0) {
                if (virtual_phone_numbers_info?.phone_number !== virtual_phone_numbers?.data?.rows[0]?.virtual_phone_number) {
                    updateVirtualPhoneNumber({
                        id: virtual_phone_numbers_info?.id,
                        data: updatedInfoObj
                    });
                }
                else {
                    toast.info(getLocaleString('noChangesDetected'));
                }
            } else {
                createVirtualPhoneNumber({
                    ...updatedInfoObj,
                    company_id: currentUser?.company_id,
                });
            }
        }
    }, [virtual_phone_numbers?.data?.rows, currentUser?.company_id,
        updateVirtualPhoneNumber, createVirtualPhoneNumber, virtual_phone_numbers_info]);

    return {
        userValues,
        handleUserInfoUpdate,
        updateUserFields,
        currentUser,
        companyValues,
        updateCompanyFields,
        handleCompanyInfoUpdate,
        goBack,
        isUserUpdating,
        isCompanyUpdating,
        openDelete, setOpenDelete, isCompanyDeleting, handleDeleteAccount,
        virtual_phone_numbers_info, setVirtualPhoneNumbersInfo, isVirtualPhoneNumbersLoading,
        handleVirtualPhoneNumber, isCreatingVirtualPhoneNumber, isUpdatingVirtualPhoneNumber,
        aiEmployees: aiEmployees?.data?.rows || [],
    };
}

export default useProfile;
