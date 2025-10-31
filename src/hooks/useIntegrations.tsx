"use client";

import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useStore from "@/store";
import { deleteInstaLoginApi, exchangeTokenForCode, mockInstaLoginApi } from "@/api/instagrams";
import { findUser } from "@/api/users";
import { deleteFBLoginApi, exchangePageForToken } from "@/api/facebooks";
import { fbLogin, sessionInfoListener } from "@/utils/fbSdk";
import { exchangeWABAForToken, registerPhoneApi } from "@/api/wabaOnboarding";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/joy";
import { routes } from "@/utils/routes/localRoutes";

function useIntegrations() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentUser = useStore((state) => state?.currentUser);
    const updateCurrentUser = useStore(state => state.updateCurrentUser)
    const code = searchParams.get('code');
    const [waba_meta_id, setWaba_meta_id] = useState();
    const [business_phone_id, setBusiness_phone_id] = useState();
    const [onboardingCode, setOnboardingCode] = useState();
    const [pin, setPin] = useState('');
    const [openModal, setOpenModal] = useState('');
    const [selectedIntegration, setSelectedIntegration] = useState(null);
    const [wabaCancelled, setWabaCancelled] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    useEffect(() => {
        window.addEventListener('message', (event) => sessionInfoListener(event, (response: any) => {
            console.log('respinse', response)
            if (response.waba_id) {
                setWaba_meta_id(response.waba_id);
            }
            if (response.phone_number_id) {
                setBusiness_phone_id(response.phone_number_id);
            }
            if (response.reason === "CANCELLED") {
                setWabaCancelled(true);
            }

        }));
    }, [setWaba_meta_id, setBusiness_phone_id, setWabaCancelled])




    const { mutate: fetchUser, isPending } = useMutation({
        mutationKey: ["findUser"],
        mutationFn: findUser,
        onSuccess: (response) => {
            if (response) {
                updateCurrentUser(response.data)
            }
        },
        onError: (error) => {
        }
    });

    // WABA onboarding
    const { mutate: onBoardWABA, isPending: isWABAUserOnboarding } = useMutation({
        mutationKey: ["exchangeWABAForToken"],
        mutationFn: (params: any) => {
            return exchangeWABAForToken({
                company_id: currentUser.company_id,
                waba_meta_id: params?.waba_meta_id,
                business_phone_id: params?.business_phone_id,
                code: params?.onboardingCode,
            })
        },
        onSuccess: (response) => {
            if (response) {
                // response.data
                fetchUser({ user_id: currentUser.id });
                setWaba_meta_id(undefined);
                setBusiness_phone_id(undefined);
                setOnboardingCode(undefined);
            }
        },
        onError: (error) => {
        }
    });

    const { mutate: registerPhone, isPending: isPhoneRegistering } = useMutation({
        mutationKey: ["registerPhoneApi"],
        mutationFn: (params: any) => {
            return registerPhoneApi({
                business_phone_id: business_phone_id,
                pin: params.pin,
                waba_id: currentUser?.company?.wabas[0].id
            })
        },
        onSuccess: (response) => {
            if (response) {
                // response.data
                // fetchUser({ user_id: currentUser.id });
                setOpenModal('')
                setPin('')
                setBusiness_phone_id(undefined)

                if (pathname === routes.profile.integrations.waba) {
                    router.back();
                }
            }
        },
        onError: (error) => {
        }
    });

    useEffect(() => {

        if (waba_meta_id && business_phone_id && onboardingCode) {
            onBoardWABA({
                waba_meta_id,
                business_phone_id,
                onboardingCode,
            })
        }

    }, [waba_meta_id, business_phone_id, onboardingCode]);

    // insta onboarding
    const { mutate, isPending: isTokenExchanging } = useMutation({
        mutationKey: ["exchangeTokenForCode"],
        mutationFn: (code) => {
            return exchangeTokenForCode({
                code,
                company_id: currentUser.company_id,
            })
        },
        onSuccess: (response) => {
            if (response) {
                // response.data
                fetchUser({ user_id: currentUser.id });
            }
        },
        onError: (error) => {
        }
    });

    const { mutate: deleteInstaLoginHandler, isPending: isInstaLoginDeleting } = useMutation({
        mutationKey: ["deleteFBLogin"],
        mutationFn: (params) => {
            return deleteInstaLoginApi({
                instaId: params,
            })
        },
        onSuccess: (response) => {
            if (response) {
                // response.data
                fetchUser({ user_id: currentUser.id });
                router.back()
            }
        },
        onError: (error) => {
        }
    });

    // fb onboarding
    const { mutate: onBoardFBUser, isPending: isFBUserOnboarding } = useMutation({
        mutationKey: ["exchangePageForToken"],
        mutationFn: (params) => {
            let paramsObj = {
                company_id: currentUser.company_id,
            };
            if (params?.access_token) {
                paramsObj.access_token = params.access_token
            }
            if (params?.code) {
                paramsObj.code = params.code
            }
            return exchangePageForToken(paramsObj)
        },
        onSuccess: (response) => {
            if (response) {
                // response.data
                fetchUser({ user_id: currentUser.id });
            }
        },
        onError: (error) => {
        }
    });

    const { mutate: deleteFBLoginHandler, isPending: isFBLoginDeleting } = useMutation({
        mutationKey: ["deleteFBLoginHandler"],
        mutationFn: (params) => {
            return deleteFBLoginApi({
                fbId: params,
            })
        },
        onSuccess: (response) => {
            if (response) {
                // response.data
                fetchUser({ user_id: currentUser.id });
                router.back()
            }
        },
        onError: (error) => {
        }
    });

    const { mutate: mockInstaLoginHandler, isPending: isFBUserMockOnboarding } = useMutation({
        mutationKey: ["mockInstaLoginHandler"],
        mutationFn: (params) => {
            return mockInstaLoginApi({
                company_id: currentUser.company_id,
                insta_professional_account_id: currentUser.company?.instagrams[0]?.insta_professional_account_id
            })
        },
        onSuccess: (response) => {
            if (response) {
                // response.data
                fetchUser({ user_id: currentUser.id });
            }
        },
        onError: (error) => {
        }
    });

    useEffect(() => {

        if (!wabaCancelled && onboardingCode && !waba_meta_id && !business_phone_id) {
            onBoardFBUser({
                code: onboardingCode
            });
        }

    }, [wabaCancelled, onboardingCode, waba_meta_id, business_phone_id]);

    const initiateFBOnboarding = useCallback((config_id) => {
        fbLogin(config_id).then((response: any) => {
            console.log('response 1', response);
            if (response.status === "connected") {
                console.log("Person is connected");
            } else {
                // something
            }

            if (response?.authResponse) {
                const code = response?.authResponse?.code;
                console.log('response 2: ', code); // remove after testing
                setOnboardingCode(code);

                // your code goes here
            } else {
                console.log('response: 2', response); // remove after testing
                // your code goes here
            }
        })
    }, []);

    useEffect(() => {
        if (pin?.length === 6) {
            registerPhone({
                pin: pin
            })
        }
    }, [pin])

    // instagram exchange token
    useEffect(() => {
        if (code) {
            mutate(code);
        }
    }, [code])

    // fb token exchange
    useEffect(() => {
        const hash = window.location.hash.substring(1); // Remove the '#' character

        // Parse the hash into key-value pairs
        const params = new URLSearchParams(hash);
        const access_token = params.get("access_token");

        if (access_token) {
            onBoardFBUser({
                access_token: access_token
            });
        }
    }, [])

    const initiateRegisterPhone = useCallback((businessNumberId) => {
        setBusiness_phone_id(businessNumberId);
        setOpenModal('pin')
    }, [setBusiness_phone_id, setOpenModal]);

    const mockInstLogin = useCallback(() => {
        mockInstaLoginHandler();
    }, [mockInstaLoginHandler]);

    const deleteFbLogin = useCallback((id: any) => {
        deleteFBLoginHandler(id)
    }, [deleteFBLoginHandler]);

    const deleteInstaLogin = useCallback((id: any) => {
        deleteInstaLoginHandler(id)
    }, [deleteInstaLoginHandler]);


    return {
        currentUser,
        isTokenExchanging,
        isWABAUserOnboarding,
        isFBUserOnboarding,
        initiateFBOnboarding,
        pin, setPin, openModal, setOpenModal,
        selectedIntegration, setSelectedIntegration,
        isMobile,
        isPhoneRegistering, initiateRegisterPhone,
        onBoardFBUser,
        mutate,
        mockInstLogin,
        isFBUserMockOnboarding,
        deleteFbLogin,
        deleteInstaLogin,
        isFBLoginDeleting,
        isInstaLoginDeleting
    };
}

export default useIntegrations;
