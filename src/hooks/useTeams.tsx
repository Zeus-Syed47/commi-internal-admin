"use client"

import useStore from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react"
import _ from 'lodash';
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes/localRoutes";
import { addUserToACompany, findUserOfCompany, findUsersOfCompany, removeUserFromACompany, updateUserOfACompany } from "@/api/users";
import { getPhoneNumbers } from "@/api/phoneNumbers";
import { getVirtualPhoneNumbers } from "@/api/virtualPhoneNumbers";
import { getDatasources } from "@/api/datasources";

const defaultUserValues = {
    name: "",
    email: "",
    password: "",
    teamMembers: [],
    // ai related
    is_ai_active: false,
    ai_agent_options: {},
    system_prompt: "",
    opening_script: "",
    knowledge: []
}

function useTeams(props: any) {
    const { forAI = false } = props;
    const router = useRouter();

    const [userValues, setUserValues] = useState(
        defaultUserValues
    );

    const [currentPage, setCurrentPage] = useState(1);

    const currentUser = useStore((state) => state?.currentUser);

    const selectedUserForEdit = useStore((state) => state?.selectedUserForEdit);
    const updateSelectedUserForEdit = useStore((state) => state?.updateSelectedUserForEdit);
    const userTypeAndManager = useStore((state) => state?.userTypeAndManager)
    const updateUserTypeAndManager = useStore((state) => state?.updateUserTypeAndManager)


    const { data: companyUsers, isLoading: isCompanyUsersLoading, refetch } = useQuery({
        queryKey: ["companyUsers"],
        queryFn: () => {
            return findUsersOfCompany({
                company_id: currentUser?.company_id,
                forAI: forAI
            });
        },
        enabled: true,
    });

    const { isPending: isPhonesLoading, data: phone_numbers, refetch: refetchPhoneNumbers } = useQuery({
        queryKey: ['getPhoneNumbers'],
        queryFn: () => {
            return getPhoneNumbers({
                waba_meta_id: currentUser?.company?.wabas[0]?.waba_meta_id,
                waba_id: currentUser?.company?.wabas[0]?.id
            })
        },
        enabled: currentUser?.type === 'admin'
    })

    const { isLoading: isVirtualPhoneNumbersLoading, data: virtual_phone_numbers, refetch: refetchVirtual } = useQuery({
        queryKey: ['phone_numbers'],
        queryFn: () => {
            return getVirtualPhoneNumbers({
                company_id: currentUser?.company_id,
            })
        },
        enabled: true, // TODO only for admin
    })

    const { isLoading: isDatasourcesLoading, data: data_sources, refetch: refetchDatasource } = useQuery({
        queryKey: ['data_sources'],
        queryFn: () => {
            return getDatasources({
                company_id: currentUser?.company_id,
            })
        },
        enabled: true, // TODO only for admin
    })

    useEffect(() => {
        if (Object.keys(selectedUserForEdit)?.length > 0) {
            let userValuesObj: any = {}
            if (selectedUserForEdit?.name) {
                userValuesObj.name = selectedUserForEdit?.name
            }
            if (selectedUserForEdit?.email) {
                userValuesObj.email = selectedUserForEdit?.email
            }
            if (selectedUserForEdit?.teamMembers?.length > 0) {
                userValuesObj.teamMembers = selectedUserForEdit?.teamMembers
            }
            if (selectedUserForEdit?.is_ai_active) {
                userValuesObj.is_ai_active = selectedUserForEdit?.is_ai_active
            }
            if (selectedUserForEdit?.ai_agent_options) {
                userValuesObj.ai_agent_options = selectedUserForEdit?.ai_agent_options
            }
            if (selectedUserForEdit?.system_prompt) {
                userValuesObj.system_prompt = selectedUserForEdit?.system_prompt
            }
            if (selectedUserForEdit?.opening_script) {
                userValuesObj.opening_script = selectedUserForEdit?.opening_script
            }
            if (selectedUserForEdit?.phone_number_id) {
                userValuesObj.phone_number_id = selectedUserForEdit?.phone_number_id
            }
            if (selectedUserForEdit?.knowledge?.length > 0) {
                userValuesObj.knowledge = typeof selectedUserForEdit?.knowledge === "string"
                    ? JSON.parse(selectedUserForEdit.knowledge)
                    : selectedUserForEdit?.knowledge ?? []
            }
            setUserValues(userValuesObj)
        }
    }, [setUserValues, selectedUserForEdit])


    const { mutate: fetchSingleUserApi, isPending: isSingleUserLoading } =
        useMutation({
            mutationKey: ["fetchSingleUserApi"],
            mutationFn: findUserOfCompany,
            onSuccess(data, variables, context) {
                if (data?.data) {
                    updateSelectedUserForEdit(data?.data);
                }
            },
        });

    const { mutate: addUserApi, isPending: isUserAdding } =
        useMutation({
            mutationKey: ["addUserToACompany"],
            mutationFn: addUserToACompany,
            onSuccess(data, variables, context) {
                if (data) {
                    updateUserTypeAndManager({})
                    refetch();
                    if (forAI) {
                        router.push(routes.ai.home)
                    }
                    else {
                        router.push(routes.profile.team)
                    }
                }
            },
        });

    const { mutate: updateUserApi, isPending: isUserUpdating } =
        useMutation({
            mutationKey: ["updateUserOfACompany"],
            mutationFn: updateUserOfACompany,
            onSuccess(data, variables, context) {
                if (data) {
                    updateSelectedUserForEdit({})
                    setUserValues(defaultUserValues)
                    refetch();
                    if (forAI) {
                        router.push(routes.ai.home)
                    }
                    else {
                        router.push(routes.profile.team)
                    }
                }
            },
        });

    const { mutate: updateTeamMembersApi, isPending: isTeamMemberUpdating } =
        useMutation({
            mutationKey: ["updateUserOfACompany"],
            mutationFn: updateUserOfACompany,
            onSuccess(data, variables, context) {
                if (data?.data) {
                    fetchSingleUserApi({
                        user_id: selectedUserForEdit?.id
                    })
                }
            },
        });

    const { mutate: removeUserApi, isPending: isUserRemoving } =
        useMutation({
            mutationKey: ["addUserToACompany"],
            mutationFn: removeUserFromACompany,
            onSuccess(data, variables, context) {
                if (data) {
                    refetch();
                    router.push(routes.profile.team)
                }
            },
        });


    const updateUserFields = useCallback((data: any) => {
        setUserValues(prev => ({
            ...prev,
            [data.key]: data.value
        }))
    }, [setUserValues]);

    const resetContactFields = useCallback(() => {
        setUserValues(defaultUserValues)

    }, [setUserValues]);

    const handleAddUser = useCallback(() => {

        if (!userValues.email) {
            // setError('Please select a template')
            return;
        }
        if (!userValues.name) {
            // setError('Please enter a name')
            return;
        }
        if (!userValues?.password) {
            // setError('Please enter a name')
            return;
        }


        let tempObj: any = {
            name: userValues.name,
            email: userValues.email,
            password: userValues.password,
            company_id: currentUser?.company_id,
            manager_id: userTypeAndManager?.manager_id,
            type: userTypeAndManager?.type,
            assigned_phone_number_id: userValues?.assigned_phone_number_id ?? null,
            is_instagram_manager: userValues?.is_instagram_manager ?? false,
            is_facebook_manager: userValues?.is_facebook_manager ?? false
        };


        addUserApi(tempObj)


    }, [addUserApi, userValues, currentUser, userTypeAndManager]);

    const handleAddAiUser = useCallback(() => {

        if (!userValues.name) {
            return;
        }
        if (!userValues?.phone_number_id) {
            return;
        }

        let tempObj: any = {
            name: userValues.name,
            company_id: currentUser?.company_id,
            manager_id: currentUser?.id, // only admin can create ai user
            is_ai_agent: true,
            is_ai_active: userValues.is_ai_active,
            ai_agent_options: userValues.ai_agent_options,
            system_prompt: userValues.system_prompt,
            opening_script: userValues.opening_script,
            phone_number_id: userValues.phone_number_id,
            knowledge: userValues.knowledge
        };
        addUserApi(tempObj)
    }, [addUserApi, userValues, currentUser]);

    const handleUserInfoUpdate = useCallback(() => {
        let updateObj: any = {
            assigned_phone_number_id: userValues?.assigned_phone_number_id ?? null,
            is_instagram_manager: userValues?.is_instagram_manager ?? false,
            is_facebook_manager: userValues?.is_facebook_manager ?? false
        }
        if (userValues?.name) {
            updateObj.name = userValues.name
        }
        if (userValues?.password) {
            updateObj.password = userValues.password
        }
        updateUserApi({
            data: updateObj,
            user_id: selectedUserForEdit?.id
        })
    }, [userValues, selectedUserForEdit, updateUserApi]);

    const handleAIUserInfo = useCallback(() => {
        let tempObj: any = {};

        if (userValues.name) {
            tempObj.name = userValues.name;
        }
        if (currentUser?.company_id) {
            tempObj.company_id = currentUser.company_id;
        }
        if (userValues.is_ai_active !== undefined) {
            tempObj.is_ai_active = userValues.is_ai_active;
        }
        if (userValues.ai_agent_options) {
            tempObj.ai_agent_options = userValues.ai_agent_options;
        }
        if (userValues.system_prompt) {
            tempObj.system_prompt = userValues.system_prompt;
        }
        if (userValues.opening_script) {
            tempObj.opening_script = userValues.opening_script;
        }
        if (userValues.phone_number_id) {
            tempObj.phone_number_id = userValues.phone_number_id;
        }
        if (userValues?.knowledge?.length > 0) {
            tempObj.knowledge = userValues?.knowledge;
        }

        updateUserApi({
            data: tempObj,
            user_id: selectedUserForEdit?.id
        });
    }, [currentUser, updateUserApi, selectedUserForEdit, userValues]);

    const handleUserManagerUpdate = useCallback((params) => {
        updateTeamMembersApi({
            data: {
                manager_id: params.manager_id,
            },
            user_id: params?.user_id
        })
    }, [updateTeamMembersApi]);

    const onDelete = useCallback((row: any) => {
        removeUserApi({
            company_id: row?.company_id,
            user_id: row?.id,
        })
    }, [removeUserApi]);

    const onAdd = useCallback((data: any) => {
        updateUserTypeAndManager({
            manager_id: data.manager_id,
            type: data.type
        });
        if (data?.clear) {
            updateSelectedUserForEdit({})
            setUserValues(defaultUserValues)
        }
        router.replace(routes.users.create)
    }, [router, updateUserTypeAndManager, updateSelectedUserForEdit, setUserValues]);

    const onEdit = useCallback((data: any) => {
        updateSelectedUserForEdit(data)
        if (forAI) {
            router.push(routes.ai.create)
        }
        else {
            router.push(routes.users.create)
        }
    }, [updateSelectedUserForEdit, router, forAI]);

    const onAddAIClick = useCallback(() => {
        router.push(routes.ai.create)
    }, []);


    return {
        companyUsers: companyUsers?.data?.rows ?? [],
        handleAddUser: handleAddUser,
        updateUserFields: updateUserFields,
        resetContactFields: resetContactFields,
        userValues: userValues,
        isUserAdding: isUserAdding,
        isCompanyUsersLoading: isCompanyUsersLoading,
        currentPage, setCurrentPage,
        totalRows: companyUsers?.data?.totalRows ?? 0,
        updateSelectedUserForEdit,
        selectedUserForEdit,
        removeUserApi,
        onDelete,
        onAdd,
        onEdit,
        updateUserTypeAndManager,
        currentUser: currentUser,
        updateUserApi,
        userTypeAndManager,
        handleUserInfoUpdate,
        handleUserManagerUpdate,
        isUserUpdating,
        phone_numbers,
        isPhonesLoading,
        handleAddAiUser, handleAIUserInfo,
        onAddAIClick, virtual_phone_numbers: virtual_phone_numbers?.data?.rows, data_sources: data_sources?.data?.rows ?? [],
    }

}


export default useTeams